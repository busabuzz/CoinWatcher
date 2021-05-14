import React, { useState, useEffect } from "react";

import "./SymbolList.css";
import Grid from "@material-ui/core/Grid";
import SymbolCard from "./SymbolCard";

const SymbolList = (props) => {
  const [data, setData] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setIsInitialized(true);
    }
  }, [data]);

  useEffect(() => {
    fetch("http://localhost:8081/")
      .then((response) => response.json())
      .then((dataIn) => {
        setData(dataIn);
      });
  }, []);

  useEffect(() => {
    if (isInitialized) {
      const websocket = new WebSocket("ws://localhost:8081");
      websocket.onerror = (error) => {
        console.log(error);
      };

      websocket.onopen = () => {
        console.log("websocket opened", websocket);
      };

      websocket.onmessage = (message) => {
        message = JSON.parse(message.data);
        let newData = { ...data };
        newData[message.symbol].shift();
        newData[message.symbol].push(message.close);
        setData(newData);
      };
    }
  }, [isInitialized]);

  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center" className="symbollist">
      {Object.keys(data).map((key, index) => {
        return <SymbolCard key={key} symbol={key} data={data[key]} />;
      })}
    </Grid>
  );
};

export default SymbolList;
