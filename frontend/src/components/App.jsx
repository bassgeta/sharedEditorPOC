import React from "react"
import styled from "styled-components"

import {useWebsocket} from "../hooks/useWebsocket"

const Test = styled.div`
  width: 200px;
  height: 100px;

  background-color: red;
`
const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
`
const StyledTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`
const StyledClient = styled.li`
  color: ${({isCurrent}) => isCurrent ? "green" : "black"};
`
const StyledInput = styled.textarea``

const App = () => {
  const {content, clientId, clientList} = useWebsocket();
  return (
    <StyledApp>
      <StyledTop>
        <div>{`My username: ${clientId}`}</div>
        <ul>
          {
            clientList.map(client => <StyledClient key={client} isCurrent={clientId === client}>{client}</StyledClient>)
          }
        </ul>
      </StyledTop>
      <StyledInput value2={content} />
    </StyledApp>
  )
}

export default App

