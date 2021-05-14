import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import "./SymbolCard.css";
import ApexChart from "./ApexChart";
import {Button} from "react-bootstrap";

const SymbolCard = (props) => {

  const stringSplit = (inString) => {
    let lastHalf = inString.substr(-4, 4);
    let firstHalf = inString.substring(0, inString.length - 4);
    return firstHalf + "_" + lastHalf; 
  };

  const [tradeLink, setTradeLink] = useState("https://www.binance.com/nl/trade/" + stringSplit(props.symbol) + "?layout=basic&type=spot");

  const clickHandler = () => {
    window.open(tradeLink, "_blank");
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.symbol}<Button onClick={clickHandler}>Open on binance</Button></Card.Title>
        <ApexChart data={props.data} symbol={props.symbol} />
      </Card.Body>
    </Card>
  );
};

export default SymbolCard;
