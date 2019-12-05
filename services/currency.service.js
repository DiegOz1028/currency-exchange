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
  async currencyExchange(base, rate) {
    const response = await this.getData().catch(error => {
      throw Error(error)
    })
    const rate = response.rates[rate]
    return base * rate
  }
}
// http://data.fixer.io/api/latest?access_key=b3eb1bf9c8509bd64060fcee1a106454
// http://data.fixer.io/api/2019-12-01?access_key=b3eb1bf9c8509bd64060fcee1a106454&format=1
