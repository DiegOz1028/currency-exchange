import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import 'isomorphic-fetch'

const headers = { 'Content-Type': 'application/json; charset=UTF-8' }

const initialState = {
  historicPrices: [],
  convertedAmount: null
}

export const actionTypes = {
  SET_HISTORIC_PRICES: 'SET_HISTORIC_PRICES',
  UPDATE_AMOUNT: 'UPDATE_AMOUNT'
}

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_HISTORIC_PRICES:
      return {
        ...state,
        historicPrices: action.historicPrices
      }
    case actionTypes.UPDATE_AMOUNT:
      return {
        ...state,
        convertedAmount: action.convertedAmount
      }
    default:
      return state
  }
}
// ACTIONS
const setHistoricPrices = historicPrices => {
  return { type: actionTypes.SET_HISTORIC_PRICES, historicPrices }
}
export const getHistoricPrices = () => dispatch => {
  fetch('/historic', {
    method: 'GET',
    headers
  })
    .then(response => response.json())
    .then(data => dispatch(setHistoricPrices(data)))
    .catch(error => dispatch(error))
}

const updateAmount = convertedAmount => {
  return { type: actionTypes.UPDATE_AMOUNT, convertedAmount }
}
export const convertAmount = (base, currency) => dispatch => {
  fetch('/convert', {
    method: 'POST',
    body: JSON.stringify({ base, currency }),
    headers
  })
    .then(response => response.json())
    .then(data => dispatch(updateAmount(data)))
    .catch(error => dispatch(error))
}

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['exampleData'] // place to select which state you want to persist
}

const persistedReducer = persistReducer(persistConfig, reducer)

export function initializeStore() {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  )
}
