// server.js
const currencyService = require('./services/currency.service')
const next = require('next')
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)
const port = process.env.PORT || 3000
// // With express
const express = require('express')
const currency = new currencyService()

app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(bodyParser.json())

  server.get('/historic', async (req, res, next) => {
    try {
      const response = await currency.getHistoric()
      return res.json(response)
    } catch (error) {
      return next(error)
    }
  })

  server.post('/convert', async (req, res, next) => {
    try {
      delete req.body['g-recaptcha-response']
      const response = await currency.currencyExchange(
        req.body.base,
        req.body.currency
      )
      return res.json(response)
    } catch (error) {
      return next(error)
    }
  })

  server.get('*', (req, res) => {
    return handler(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log('> Read on http://localhost:3000')
  })
})
