import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'
import { createStore, compose, applyMiddleware } from 'redux'
import proptypes from 'prop-types'
import { Provider } from 'react-redux'
import reducer from '../reducers'
import rootSaga from '../sagas'
import createSagaMiddleware from 'redux-saga'

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

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
        )
  const store = createStore(reducer, initialState, enhancer)
  sagaMiddleware.run(rootSaga)
  return store
}

export default withRedux(configureStore)(_app)
