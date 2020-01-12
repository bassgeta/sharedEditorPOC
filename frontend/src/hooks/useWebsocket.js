import React from "react"

function useWebsocket() {
  const client = new WebSocket('ws://127.0.0.1:8080');
  const [content, setContent] = React.useState('')

  client.onopen = () => console.log("Initialized websocket connection!")
  client.onmessage = message => console.log("Received message ", message)

  return {content}
}

export {useWebsocket}

