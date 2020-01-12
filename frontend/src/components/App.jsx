import React from "react"
import styled from "styled-components"

import {useWebsocket} from "../hooks/useWebsocket"

const Test = styled.div`
  width: 200px;
  height: 100px;

  background-color: red;
`
const App = () => {
  const {content} = useWebsocket();
  return (
    <Test />
  )
}

export default App

