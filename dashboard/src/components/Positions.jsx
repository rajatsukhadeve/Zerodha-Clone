import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";


const Positions = () => {
  let [allPositions , setAllPositions] = useState([]);

  useEffect(()=>{
    const fetchData =async()=>{
      try{
        const res = await axios.get("http://localhost:8080/allPositions",{ withCredentials: true });
        setAllPositions(res.data);
      }catch(e){
        console.error("failed to load positions",e);
      }
    }
    fetchData();
  },[])

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>

          <tbody>
            {allPositions.map((stock, idx) => {
              const currval = stock.price * stock.qty;
              const pnl = currval - stock.avg * stock.qty;
              const isProfit = pnl >= 0.0;

              const profClass = isProfit ? "profit" : "loss";
              const dayChange = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock.name || idx}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td className={dayChange}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
