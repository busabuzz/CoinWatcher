import React from "react";
import "./CoinDashboard.css";
import SymbolList from "./SymbolList";

const CoinDashboard = (props) => {
  return (
    <div className="coindashboard">
      <SymbolList></SymbolList>
    </div>
  );
};

export default CoinDashboard;
