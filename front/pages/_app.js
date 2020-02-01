import React from 'react'
import Helmet from 'react-helmet'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers'
import rootSaga from '../sagas'
import createSagaMiddleware from 'redux-saga'
import { LOAD_USER_REQUEST } from '../reducers/user'
import axios from 'axios'
import { Container } from 'next/app'
import { GlobalStyle } from '../reset.css.ts'

const _app = ({ Component, store, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Provider store={store}>
          <Helmet
            title="DietTogether"
            htmlAttributes={{ lang: 'ko' }}
            meta={[
              {
                charset: 'UTF-8'
              },
              {
                name: 'viewport',
                content:
                  'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover'
              },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge'
              },
              {
                name: 'description',
                content: 'DietTogether'
              },
              {
                name: 'og:title',
                content: 'DietTogether'
              },
              {
                name: 'og:description',
                content: 'DietTogether'
              },
              {
                property: 'og:type',
                content: 'website'
              },
              {
                property: 'og:image',
                content: 'http://localhost:3060/favicon.ico'
              }
            ]}
            link={[
              {
                rel: 'shortcut icon',
                href: '/favicon.ico'
              },

              {
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
              },
              {
                rel: 'stylesheet',
                href:
                  'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
              }
            ]}
          />
          <Component {...pageProps} />
          {/* 컴포넌트가 페이지들! */}
        </Provider>
      </Container>
    </>
  )
}

_app.getInitialProps = async context => {
  // console.log('contextinfo', context)
  const { ctx, Component } = context
  let pageProps = {}
  // 순서 신경쓰기!
  const state = ctx.store.getState()
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '' // 클라이언트 환경에서 에러
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = ''
  }
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie
  }
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST
    })
  }
  if (Component.getInitialProps) {
    pageProps = (await Component.getInitialProps(ctx)) || {}
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
  store.sagaTask = sagaMiddleware.run(rootSaga)
  return store
}

export default withRedux(configureStore)(withReduxSaga(_app))
//
