
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/allOrders",{ withCredentials: true });
        setOrders(res.data);
      } catch (err) {
        console.error('failed to load orders', err);
      }
    }
    fetchData();
  }, [])

  return (
    <div className="orders">
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>

          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Mode</th>
            </tr>

            {orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{order.price.toFixed(2)}</td>
                  <td>{order.mode}</td>
                </tr>
              );
            })}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;