import { useState, useEffect } from "react";
import axios from 'axios';
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  let [holdings, setHoldings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/allHoldings',{ withCredentials: true })
      .then((res) => {
        setHoldings(res.data);
      })
      .catch((err) => {
        console.error("field to load holdings", err);

      });
  }, []);

  const labels = holdings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: 'stock price',
        data: holdings.map((stock) =>stock.price ),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  }

  const totalInvestment = holdings.reduce((total , stock)=>{
    return total + (stock.avg * stock.qty);
  },0);

  const totalCurrVal = holdings.reduce((total,stock)=>{
    return total+(stock.price*stock.qty);
  },0);

  const pnl = totalCurrVal - totalInvestment;
  const pnlPercent = (pnl/totalInvestment)*100;

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {holdings.map((stock, idx) => {
            let currval = stock.price * stock.qty;
            let isProfit = currval - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayChange = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={idx} >
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{currval.toFixed(2)}</td>
                <td className={profClass}>{(currval - stock.avg * stock.qty).toFixed(2)}</td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayChange}>{stock.day}</td>
              </tr>
            )
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {totalInvestment.toFixed(2)}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {totalCurrVal.toFixed(2)}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 style={{ color: pnlPercent > 0 ? "green" : "red" }}>{`${pnl.toFixed(2)} (${pnlPercent.toFixed(2)}%)`}</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;