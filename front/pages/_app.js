import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import proptypes from 'prop-types'

const _app = ({ Component }) => {
  return (
    <>
      <Head>
        <title>dietTogether</title>
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </>
  )
}

_app.proptypes = {
  Component: proptypes.elementType
}

export default _app
