import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'
import { createStore } from 'redux'
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
  const store = createStore(reducer, initialState)
  // 스토어 커스터마이징
  return store
})(_app)
