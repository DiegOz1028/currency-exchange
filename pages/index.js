import React from 'react'
import Button from '../components/button'
import Input from '../components/input'
import '../css/styles.scss'
import 'isomorphic-fetch'

class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      base: '',
      rate: '',
      response: null
    }
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  changeResponseStatus = response => {
    this.setState({ rate: response })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    fetch('/convert', {
      method: 'POST',
      body: JSON.stringify({ base: this.state.base }),
      headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    })
      .then(response => response.json())
      .then(data => this.changeResponseStatus(data))
      .catch(error => console.log(error))
  }

  renderResponse = () => (
    <>
      <a>{this.state.response}</a>
    </>
  )

  renderInquiryForm = () => {
    const { base, rate } = this.state
    return (
      <form onSubmit={this.handleSubmit} className="currency-exchange-form">
        <div className="inputContainer">
          <h4>Base</h4>
          <Input
            maxlength={15}
            name={'base'}
            id={'inp-base'}
            placeholder={'EUR'}
            value={base}
            onChange={this.handleChange}
          />
        </div>
        <div className="inputContainer">
          <h4>Rate</h4>
          <Input
            maxlength={15}
            name={'rate'}
            id={'inp-rate'}
            placeholder={'USD'}
            value={rate}
            onChange={this.handleChange}
            disabled={true}
          />
        </div>
        <Button text={'CALCULATE'} name={'btn-get-status'} disabled={!base} />
      </form>
    )
  }
  render() {
    const { response } = this.state
    return (
      <div className="main-container">
        {this.renderInquiryForm()}
        {response && this.renderResponse()}
      </div>
    )
  }
}

export default Index
