const http = require('./http')
var moment = require('moment')

const url = process.env.API_URL
const key = process.env.API_KEY

const mergeResults = (object1, object2) => {
  const setHash = o =>
    Object.entries(o).forEach(([k, v]) =>
      Object.assign((hash[k] = hash[k] || {}), v)
    )
  var hash = Object.create(null),
    result
  object1.forEach(setHash)
  object2.forEach(setHash)
  result = Object.entries(hash).map(([k, v]) => ({ [k]: v }))
  return result
}

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

  async getHistoric() {
    let arrayToReturn = []

    for (let index = 0; index < 3; index++) {
      const date = moment().subtract(index, 'days')
      const response = await this.getData(date.format('YYYY-MM-DD')).catch(
        error => {
          throw Error(error)
        }
      )
      const rates = response.rates
      const day = !index ? 'Today' : date.format('dddd')
      let arrayToCompare = []
      Object.keys(rates).map(key =>
        arrayToCompare.push({ [key]: { [index]: `${day}: ${rates[key]}` } })
      )
      const updatedResponse = await mergeResults(arrayToReturn, arrayToCompare)
      arrayToReturn = updatedResponse
    }
    return arrayToReturn.slice(0, 9)
  }
}
