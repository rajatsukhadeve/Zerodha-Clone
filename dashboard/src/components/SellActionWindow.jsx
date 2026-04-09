import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css"; // reuse same CSS

const SellActionWindow = ({ uid }) => {
    const { name, price } = uid;
    const generalContext = useContext(GeneralContext);

    const [stockQuantity, setStockQuantity] = useState(1);

    const orderValue = stockQuantity * price;

    const handleSellClick = async () => {
        try {
            if (stockQuantity <= 0) return;

            await axios.post("http://localhost:8080/sell", {
                name,
                qty: Number(stockQuantity),
                price
            }, { withCredentials: true });

            generalContext.closeSellWindow();

        } catch (err) {
            alert(err.response?.data?.error || "Sell failed");
        }
    };

    const handleCancelClick = () => {
        generalContext.closeSellWindow();
    };

    return (
        <div className="container" id="sell-window">
            <div className="regular-order">
                <div className="inputs">
                    <fieldset>
                        <legend>Qty.</legend>
                        <input
                            type="number"
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(Number(e.target.value))}
                        />
                    </fieldset>
                </div>
            </div>

            <div className="buttons">
                <span>Price ₹{price}</span>
                <span>Order Value ₹{orderValue.toFixed(2)}</span>

                <div>
                    <button className="btn btn-red" onClick={handleSellClick}>
                        Sell
                    </button>
                    <button className="btn btn-grey" onClick={handleCancelClick}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SellActionWindow;