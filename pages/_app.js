import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import Head from 'next/head'
import withReduxStore from '../lib/with-redux-store'

class MyApp extends App {
  constructor(props) {
    super(props)
    this.persistor = persistStore(props.reduxStore)
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <PersistGate
          loading={<Component {...pageProps} />}
          persistor={this.persistor}
        >
          <Head>
            <link
              href="https://fonts.googleapis.com/css?family=Cabin+Condensed|Muli:300,400&display=swap"
              rel="stylesheet"
            />
          </Head>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
