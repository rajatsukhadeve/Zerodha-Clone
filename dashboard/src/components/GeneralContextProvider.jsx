import { useState } from "react";
import GeneralContext from "./GeneralContext";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

export const GeneralContextProvider = ({ children }) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState(null);
  const [sellWindow, setSellWindow] = useState(null);

  const openBuyWindow = (data) => {
    setSellWindow(null); // optional
    setIsBuyWindowOpen(true);
    setSelectedStockUID(data);
  };

  const closeBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID(null);
  };

  const openSellWindow = (data) => {
    setIsBuyWindowOpen(false); // optional
    setSellWindow(data);
  };

  const closeSellWindow = () => {
    setSellWindow(null);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow,
        closeBuyWindow,
        openSellWindow,
        closeSellWindow,
      }}
    >
      {children}

      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {sellWindow && <SellActionWindow uid={sellWindow} />}
    </GeneralContext.Provider>
  );
};