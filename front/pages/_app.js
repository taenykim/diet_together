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

const _app = ({ Component, store, pageProps }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>DietTogether</title>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  )
}

_app.proptypes = {
  Component: proptypes.elementType,
  store: proptypes.object,
  pageProps: proptypes.object.isRequired
}

_app.getInitialProps = async context => {
  // console.log(context)
  const { ctx } = context
  let pageProps = {}
  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(ctx)
  }
  // pageProps : 컴포넌트(page)들 의 props
  return { pageProps }
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
