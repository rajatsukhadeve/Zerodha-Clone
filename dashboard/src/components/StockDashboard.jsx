import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import GeneralContext from "./GeneralContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const StockDashboard = () => {
  const { symbol } = useParams();
  const generalContext = useContext(GeneralContext);

  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStockData = async () => {
      if (!symbol) return;

      setLoading(true);
      setError("");
      setStockData(null);

      try {
        const response = await axios.get(`http://localhost:8080/search/${symbol}`);
        setStockData(response.data);
      } catch (err) {
        setError("Stock not found or error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  // ✅ ADD THESE HANDLERS ONLY
  const handleBuyClick = () => {
    generalContext.openBuyWindow({
      name: symbol,
      price: stockData.currentPrice
    });
  };

  const handleSellClick = () => {
    generalContext.openSellWindow({
      name: symbol,
      price: stockData.currentPrice
    });
  };

  const handleAddWatchlist = async () => {
    try {
      await axios.post(
        "http://localhost:8080/addToWatchlist",
        { name: symbol },
        { withCredentials: true }
      );
      alert("Added to watchlist");
    } catch (err) {
      alert(err.response?.data?.error || "Error adding");
    }
  };

  // Graph Calculations
  const labels = stockData ? stockData.history.map((item) => item.date) : [];
  const maxIndex = labels.length - 1;
  const minIndex = Math.max(0, maxIndex - 22);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Closing Price (₹)",
        data: stockData ? stockData.history.map((item) => item.price) : [],
        borderColor: "#387ed1",
        backgroundColor: "rgba(56, 126, 209, 0.1)",
        borderWidth: 2,
        tension: 0.1,
        pointRadius: 2,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Price History (Click & Drag to Scroll)" },
      zoom: {
        limits: {
          x: {
            min: labels[0],
            max: labels[labels.length - 1]
          }
        },
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: "x",
        },
      },
    },
    scales: {
      x: {
        min: labels[minIndex],
        max: labels[maxIndex],
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        grace: '5%',
      }
    },
  };

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}><h2>Loading {symbol}...</h2></div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {stockData && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #e0e0e0", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
            <div>
              <h3 style={{ margin: "0 0 10px 0" }}>{symbol.toUpperCase()}</h3>
              <p style={{ fontSize: "24px", margin: "0", fontWeight: "bold" }}>
                ₹{stockData.currentPrice?.toFixed(2)}
              </p>
              <div style={{ display: "flex", gap: "15px", marginTop: "10px", color: "#666", fontSize: "14px" }}>
                <span>Open: ₹{stockData.todayOpen?.toFixed(2)}</span>
                <span>High: ₹{stockData.todayHigh?.toFixed(2)}</span>
                <span>Low: ₹{stockData.todayLow?.toFixed(2)}</span>
                <span>Prev Close: ₹{stockData.previousClose?.toFixed(2)}</span>
              </div>
            </div>

            {/* ✅ ONLY CHANGED BUTTONS (functionality added) */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleBuyClick}
                style={{ padding: "10px 30px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
              >
                BUY
              </button>

              <button
                onClick={handleSellClick}
                style={{ padding: "10px 30px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
              >
                SELL
              </button>

              <button
                onClick={handleAddWatchlist}
                style={{ padding: "10px 20px", backgroundColor: "#387ed1", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
              >
                + Watchlist
              </button>
            </div>
          </div>

          <div style={{ height: "400px", border: "1px solid #e0e0e0", padding: "20px", borderRadius: "8px" }}>
            <p style={{ fontSize: "12px", color: "#888", marginTop: 0 }}>* Scroll horizontally to view older data. Use mouse wheel to zoom.</p>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StockDashboard;