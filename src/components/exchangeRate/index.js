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

  console.log(exchangeRate, 'rate')

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

      <ExchangeRateForm
        title="To"
        style={{ marginLeft: '40px' }}
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={onChangeToAmount}
      />
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
  font-weight: bold;
  padding-bottom: 5px;
`

export default ExchangeRate
