const WebSocket = require("ws");
const perspective = require("@finos/perspective");
const schema = require("./schema");
const { WebSocketServer, table } = perspective;
const perspectiveHost = new WebSocketServer({ port: 8081 });

perspective.initialize_profile_thread();

(async (schema) => {
  const viewTable = await table(schema);
  const URL = "ws://localhost:8500/";
  const wsFeed = new WebSocket(URL);

  wsFeed.on("open", async () => {
    console.log(`${"*".repeat(12)} Websocket Feed Connection Open ${"*".repeat(12)} `);

    wsFeed.send("Subscribing...");
  });

  wsFeed.on("message", async (data) => {
    console.log(`${"*".repeat(12)} Data Feed ${"*".repeat(12)}`);
    const feedData = JSON.parse(data.toString());
    const tableSize = await viewTable.size();

    console.log(`${"*".repeat(12)} Table Size: ${tableSize} ${"*".repeat(12)}`);

    await viewTable.update(feedData);
  });

  return viewTable;
})(schema)
  .then(
    (table) => perspectiveHost.host_table("order_book", table)
  );
