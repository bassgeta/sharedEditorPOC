const WebSocket = require("ws")
const {getId} = require("./utils")
const {types} = require("./messageTypes")
const {
  CLIENT_ID,
  ALL_CONNECTED,
  TEXT_CONTENT
} = types 

const wss = new WebSocket.Server({ port: 8080 });
const clients = {}
wss.content = "Some starting string"
wss.initializeClient = client => {
  const clientId = getId()
  client.clientId = clientId
  clients[clientId] = client;
  client.stringifiedSend = args => {
    console.log("stringifi", args)
    client.send(JSON.stringify(args)) 
  }
  console.log("all connected, ", Object.keys(clients))

  client.stringifiedSend({
    type: CLIENT_ID,
    payload: clientId
  })
  client.stringifiedSend({
    type: TEXT_CONTENT,
    payload: wss.content
  })
}

wss.broadcast = args => {
  wss.clients.forEach(client => {
    client.stringifiedSend(args)
  })
}

wss.on("connection", ws => {
  console.log("Connection opened!")
  wss.initializeClient(ws)
  wss.broadcast({
    type: ALL_CONNECTED,
    payload: Object.keys(clients) // no other data than IDs for the moment
  })
  ws.on("close", () => {
    console.log("Connection closed!")
    delete clients[ws.clientId]
    wss.broadcast({
      type: ALL_CONNECTED,
      payload: Object.keys(clients) // no other data than IDs for the moment
    })
  })
  ws.on("message", message => {
    console.log("received: %s", message);
  });

});
