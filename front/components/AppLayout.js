import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import proptypes from 'prop-types'
import LoginForm from './LoginForm'
import UserProfile from './UserProfile'
import { useSelector } from 'react-redux'
import SearchingForm from './SearchingForm'

const AppLayout_Container = styled.div`
  display: flex;
  div {
    padding: 10px;
  }
  border: 2px solid #444;
`

const AppLayout = ({ children }) => {
  const { me } = useSelector(state => state.user)

  return (
    <>
      <AppLayout_Container>
        <div key="home" style={{ marginRight: '10px' }}>
          <Link href="/">
            <a>홈</a>
          </Link>
        </div>
        <div key="profile">
          <Link href="/profile" prefetch>
            <a>프로필</a>
          </Link>
        </div>
        <div key="search">
          <SearchingForm />
        </div>
      </AppLayout_Container>
      {me ? <UserProfile /> : <LoginForm />}
      <div>{children}</div>
    </>
  )
}

AppLayout.proptypes = {
  children: proptypes.node
}

export default AppLayout
