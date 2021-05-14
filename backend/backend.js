var Binance = require("node-binance-api");
var http = require("http");
var WebSocket = require("websocket");

var binance = new Binance().options({
  APIKEY: "<key>",
  APISECRET: "<secret>",
});

let markets = [];
const numberOfCoins = 16;
let data = {};
const dataWindow = 100;

let server = http
  .createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "application/json" });
    console.log(request.url);
    if (isServerReady() && request.url === '/') {
      response.end(JSON.stringify(data));
    }
  })
  .listen(8081);

const isServerReady = () => {
  if (Object.keys(data).length !== numberOfCoins) return false;
  
  Object.keys(data).map((key, index) => {
    if (data[key].length === 0) return false;
  });
  return true;
};

const wss = new WebSocket.server({
  httpServer: server,
  port: 8081,
  autoAcceptConnections: true,
});

wss.on("connect", (connection) => {
  console.log(connection.remoteAddress + "connected");
});

wss.on("request", (connection) => {
  console.log("request");
});

wss.on("close", (connection, closeReason, description) => {
  console.log(
    connection.remoteAddress + " closed connection reason: " + closeReason
  );
});

wss.onError = (error) => {
  wss.send(JSON.stringify(error));
};

binance.prevDay(false, (error, prevDay) => {
  for (let obj of prevDay) if (obj.symbol.endsWith("USDT") && !obj.symbol.startsWith("BUSD")) markets.push(obj);
  markets.sort((a, b) =>
    parseFloat(a.quoteVolume) > parseFloat(b.quoteVolume) ? -1 : 1
  );
  markets = markets.slice(0, 16).map((c) => c.symbol);

  markets.forEach((market) => {
    binance.candlesticks(
      market,
      "1m",
      (error, ticks, symbol) => {
        data[symbol] = [];
        data[symbol] = ticks.map((element) => {
          return element[4];
        });
      },
      { limit: dataWindow }
    );
  });

  binance.websockets.candlesticks(markets, "1m", (candlestickData) => {
    if (candlestickData.k.x && isServerReady()) {
      data[candlestickData.s].shift();
      data[candlestickData.s].push(candlestickData.k.c);
      wss.broadcast(
        JSON.stringify({
          "symbol": candlestickData.s,
          "close": candlestickData.k.c
        })
      );
    }
  });
});
