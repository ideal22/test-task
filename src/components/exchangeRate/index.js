import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ExchangeRateForm from '../exchangeRateForm'
import axios from '../../axios'

function ExchangeRate() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState(1)
  const [isFromAmount, setIsFromAmount] = useState(true)
  const [exchangeRate, setExchangeRate] = useState()
  // const [rowInputList, setRowInputList] = useState([])
  // const [columnInputList, setColumnInputList] = useState([])

  let fromAmount, toAmount

  if (isFromAmount) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }
  useEffect(() => {
    getCurrencyRate()
  }, [])
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      axios
        .get(`/latest?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(({ data }) => setExchangeRate(data?.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  const getCurrencyRate = async () => {
    try {
      const { data } = await axios.get('/latest?base=USD')
      const firstCurrency = Object.keys(data?.rates)[0]
      setCurrencyOptions([data?.base, ...Object.keys(data?.rates)])
      setFromCurrency(data?.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data?.rates[firstCurrency])
    } catch (e) {
      console.log(e)
    }
  }

  const onChangeFromAmount = (e) => {
    setAmount(e.target.value)
    setIsFromAmount(true)
  }

  const onChangeToAmount = (e) => {
    setAmount(e.target.value)
    setIsFromAmount(false)
  }
  return (
    <Container>
      <ExchangeRateForm
        title="From"
        style={{ marginRight: '40px' }}
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={onChangeFromAmount}
      />

      <EqualSign>=</EqualSign>

      <Cnt>
        <ExchangeRateForm
          title="To"
          style={{ marginLeft: '40px', margingRigth: '20px' }}
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={onChangeToAmount}
        />
        <Button>+</Button>
      </Cnt>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: baseline;
  margin-left: 0 auto;
  margin-right: 0 auto;
`

const EqualSign = styled.div`
  align-self: flex-end;
  font-size: 2rem;
  font-weight: 400;
  padding-bottom: 5px;
`

const Button = styled.button`
  align-self: flex-end;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 30px;
  cursor: pointer;
  color: #fff;
  background-color: #7acc00;
  margin-left: 20px;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Cnt = styled.div`
  display: flex;
  align-items: center;
`

export default ExchangeRate
