import React, { useEffect, useState } from "react";
import axios from "axios";

const Funds = () => {
  const [holdings, setHoldings] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [holdingsRes, balanceRes] = await Promise.all([
        axios.get("http://localhost:8080/allHoldings", {
          withCredentials: true,
        }),
        axios.get("http://localhost:8080/balance", {   // ✅ FIXED
          withCredentials: true,
        }),
      ]);

      console.log("Holdings:", holdingsRes.data); // 🔍 DEBUG

      setHoldings(holdingsRes.data || []);
      setBalance(balanceRes.data.balance || 0);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADD FUNDS
  const handleAddFunds = async () => {
    const amount = Number(prompt("Enter amount to add"));
    if (!amount || amount <= 0) return;

    try {
      const res = await axios.post(
        "http://localhost:8080/addFunds",
        { amount },
        { withCredentials: true }
      );

      setBalance(res.data.balance);
    } catch {
      alert("Failed to add funds");
    }
  };

  // ✅ WITHDRAW FUNDS
  const handleWithdraw = async () => {
    const amount = Number(prompt("Enter amount to withdraw"));
    if (!amount || amount <= 0) return;

    try {
      const res = await axios.post(
        "http://localhost:8080/withdrawFunds",
        { amount },
        { withCredentials: true }
      );

      setBalance(res.data.balance);
    } catch (err) {
      alert(err.response?.data?.error || "Withdraw failed");
    }
  };

  // ✅ SAFE CALCULATIONS
  const invested = holdings.reduce(
    (sum, stock) => sum + ((stock.qty || 0) * (stock.avg || 0)),
    0
  );

  const currentValue = holdings.reduce(
    (sum, stock) => sum + ((stock.qty || 0) * (stock.price ?? stock.avg ?? 0)),
    0
  );

  const totalValue = balance + currentValue;

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>

      {/* WALLET */}
      <div style={box}>
        <h3>Funds</h3>
        <h1 style={{ color: "#387ed1" }}>₹{balance.toFixed(2)}</h1>
        <p>Available Balance</p>

        <div style={{ marginTop: "10px" }}>
          <button className="btn btn-green" onClick={handleAddFunds}>
            Add Funds
          </button>

          <button
            className="btn btn-blue"
            style={{ marginLeft: "10px" }}
            onClick={handleWithdraw}
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={card}>
          <p>Invested</p>
          <h2>₹{invested.toFixed(2)}</h2>
        </div>

        <div style={card}>
          <p>Current Value</p>
          <h2>₹{currentValue.toFixed(2)}</h2>
        </div>

        <div style={card}>
          <p>Total Value</p>
          <h2>₹{totalValue.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
};

const box = {
  padding: "20px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

const card = {
  flex: 1,
  padding: "15px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

export default Funds;