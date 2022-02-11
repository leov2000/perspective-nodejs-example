const express = require("express");
const expressWS = require("express-ws");
const { app, getWss } = expressWS(express());
const { generateData } = require("./mock_generator/index.js");
const { randInterval, broadCastData } = require("./utils/index.js");
const port = 8500;

app.ws("/", async (ws, _) => {
  let clearInterval;

  ws.on("message", async (msg) => {
    console.log(`${"*".repeat(12)} Message Received, ${msg} ${"*".repeat(12)} `);

    // If there's a client Set, broadcast randomized mock data every 2-10 seconds. 
    if (getWss().clients.size) {
      const intervalResults = await randInterval(() =>
        broadCastData([...getWss().clients], generateData), 2000, 10000
      );
      clearInterval = intervalResults.clear;
    }
  });

  ws.on("close", (_) => {
    console.log(`${"*".repeat(12)} Disconnected ${"*".repeat(12)} `);

    // If there's no client Set, stop broadcasting mock data.
    if (getWss().clients.size < 1) {
      clearInterval();
    }
  });
});

app.listen(port, () => {
  console.log(`${"*".repeat(12)} Listening on port: ${port} ${"*".repeat(12)} `);
});
