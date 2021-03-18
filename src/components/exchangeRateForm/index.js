import React from 'react'
import styled from 'styled-components'

function ExchangeRateForm(props) {
  const {
    style,
    title,
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props

  return (
    <Container style={style}>
      <h3 style={{ marginBottom: 10 }}>{title}</h3>
      <FromContainer>
        <Select value={selectedCurrency} onChange={onChangeCurrency}>
          {currencyOptions &&
            currencyOptions.map((option, index) => (
              <Option value={option} key={index}>
                {option}
              </Option>
            ))}
        </Select>
        <Input
          type="number"
          style={{ width: 90 }}
          value={amount.toString()}
          onChange={onChangeAmount}
        />
      </FromContainer>
    </Container>
  )
}

const Container = styled.div``
const FromContainer = styled.div`
  border: 1px solid #00e6e6;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 1px 1px 8px #00e6e6;
`
const Input = styled.input`
  border: none;
  outline: none;
  padding: 5px;
  font-size: 15px;
  font-weight: 600;
`
const Select = styled.select`
  border: none;
  padding: 5px;
  outline: none;
  margin-right: 30px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`

const Option = styled.option`
  font-size: 15px;
  font-weight: 600;
`

export default ExchangeRateForm
