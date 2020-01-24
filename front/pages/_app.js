import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'
import { createStore, compose, applyMiddleware } from 'redux'
import proptypes from 'prop-types'
import { Provider } from 'react-redux'
import reducer from '../reducer'

const _app = ({ Component, store }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>DietTogether</title>
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </Provider>
  )
}

_app.proptypes = {
  Component: proptypes.elementType,
  store: proptypes.object
}

export default withRedux((initialState, options) => {
  const middleware = []
  const enhancer = compose(
    applyMiddleware(...middleware),
    !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
  const store = createStore(reducer, initialState, enhancer)
  return store
})(_app)
