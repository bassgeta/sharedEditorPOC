import React from "react"
import {types} from "../utils/messageTypes"
const {
  CLIENT_ID,
  ALL_CONNECTED,
  TEXT_CONTENT
} = types

const initialState = {
  content: "",
  clientId: null,
  clientList: [] 
}

const reducer = (state, {type, payload}) => {
  console.log("Dispatch", {type, payload}, CLIENT_ID)
  switch (type) {
    case CLIENT_ID:
      return {...state, clientId: payload}
    case ALL_CONNECTED:
      return {...state, clientList: payload}
    case TEXT_CONTENT:
      return {...state, content: payload}
    default:
      return {...state}
  }
}
function useWebsocket() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  let client;
  React.useEffect(() => {
    client = new WebSocket('ws://127.0.0.1:8080')
    client.onopen = () => console.log("Initialized websocket connection!")
    client.onmessage = message => {
      console.log("Received message ", message)
      const {type, payload} = JSON.parse(message.data)
      dispatch({type, payload})
    }
  }, [])


  console.log("stojt", state);
  return {...state}
}

export {useWebsocket}

