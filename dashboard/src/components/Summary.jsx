import { useEffect, useState } from "react";
import axios from "axios";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const res = await axios.get("http://localhost:8080/allHoldings", {
          withCredentials: true,
        });
        setHoldings(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHoldings();
  }, []);

  // 🔥 CALCULATIONS
  let investment = 0;
  let currentValue = 0;

  holdings.forEach((stock) => {
    investment += stock.avg * stock.qty;
    currentValue += stock.price * stock.qty;
  });

  const pnl = currentValue - investment;
  const percent = investment
    ? ((pnl / investment) * 100).toFixed(2)
    : 0;

  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      {/* EQUITY SECTION (optional static for now) */}
      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>₹{currentValue.toFixed(2)}</h3>
            <p>Current Value</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Investment <span>₹{investment.toFixed(2)}</span>
            </p>
            <p>
              P&amp;L{" "}
              <span className={pnl >= 0 ? "profit" : "loss"}>
                ₹{pnl.toFixed(2)} ({percent}%)
              </span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* HOLDINGS SECTION */}
      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnl >= 0 ? "profit" : "loss"}>
              ₹{pnl.toFixed(2)} <small>{percent}%</small>
            </h3>
            <p>P&amp;L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>₹{currentValue.toFixed(2)}</span>
            </p>
            <p>
              Investment <span>₹{investment.toFixed(2)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;