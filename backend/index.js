const WebSocket = require("ws")

const wss = new WebSocket.Server({ port: 8080 });
const startContent = "Some starting string"

wss.on("connection", ws => {
  console.log("Connection opened!")
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });

  ws.send("something");
});
