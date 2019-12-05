const http = require('./http')

const url = process.env.API_URL
const key = process.env.API_KEY

module.exports = class CurrencyService {
  async getData(date = 'latest') {
    const response = await http(
      `${url}/${date}?access_key=${key}&format=1`,
      'GET'
    ).catch(error => {
      throw Error(error)
    })
    return response
  }
  async currencyExchange(base, rateCurrency) {
    const response = await this.getData().catch(error => {
      throw Error(error)
    })
    const rate = response.rates[rateCurrency]
    return base * rate
  }
}
