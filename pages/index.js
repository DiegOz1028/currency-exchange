import React from 'react'
import { bindActionCreators } from 'redux'
import Button from '../components/button'
import Input from '../components/input'
import MoneyFormat from '../utils/moneyFormat'
import { connect } from 'react-redux'
import constants from '../constants'
import * as actions from '../store'
import '../css/styles.scss'
import 'isomorphic-fetch'

class Index extends React.Component {
  componentDidMount() {
    this.props.getHistoricPrices()
    this.setInterval()
  }

  constructor() {
    super()
    this.state = {
      base: ''
    }
  }
  setInterval = () =>
    (this.timer = setInterval(
      () => this.getHistoricPrices(),
      constants.millisecondsToGetData
    ))
  getHistoricPrices = () => {
    this.props.getHistoricPrices()
    clearInterval(this.timer)
    this.setInterval()
  }

  handleChange = evt => {
    // let newValue = MoneyFormat(evt.target.value);
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = () => {
    this.props.convertAmount(this.state.base, constants.currentCurrency)
  }

  renderCurrencyPrices = currencies => (
    <div>
      {currencies.map(currency => {
        const currentCurrency = Object.keys(currency)[0]
        const prices = Object.values(currency)[0]
        return (
          <div>
            <h4>{currentCurrency}</h4>
            <div className="pricesContainer">
              {Object.values(prices).map(value => (
                <a>{value}</a>
              ))}
            </div>
            <div className="pricesContainer">
              {Object.values(prices).map(value => (
                <a>{value}</a>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )

  renderHistoricPrice = () => {
    const { historicPrices } = this.props
    if (!historicPrices.length) return null
    const FirstFiveCurrencies = historicPrices.slice(0, 4)
    const LastFiveCurrencies = historicPrices.slice(5, 9)
    return (
      <div className="historicPrice">
        <h1>HISTORIC PRICE </h1>
        <div className="currenciesContainer">
          {this.renderCurrencyPrices(FirstFiveCurrencies)}
          {this.renderCurrencyPrices(LastFiveCurrencies)}
        </div>
      </div>
    )
  }

  renderInquiryForm = () => {
    const { base } = this.state
    return (
      <div className="currency-exchange-form">
        <div className="fieldsContaner">
          <Input
            maxlength={15}
            name={'base'}
            id={'inp-base'}
            placeholder={'EUR'}
            value={base}
            onChange={this.handleChange}
          />
          <Input
            maxlength={15}
            name={'rate'}
            id={'inp-rate'}
            placeholder={'USD'}
            value={this.props.convertedAmount}
            disabled={true}
          />
        </div>
        <Button
          text={'CALCULATE'}
          name={'btn-get-status'}
          disabled={!base}
          onClick={() => this.handleSubmit()}
        />
      </div>
    )
  }
  render() {
    return (
      <div className="main-container">
        {this.renderInquiryForm()}
        {this.renderHistoricPrice()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actions }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Index)
