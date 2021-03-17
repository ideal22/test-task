import React from 'react'
import ExchangeRate from './components/exchangeRate'
import styled from 'styled-components'

function App() {
  return (
    <Container>
      <ExchangeRate />
    </Container>
  )
}

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid silver;
`

export default App
