import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import proptypes from 'prop-types'
import LoginForm from './LoginForm'
import UserProfile from './UserProfile'

// const AppLayout_Container = styled.div`
//   display: flex;
//   color: blue;
//   margin: 10px;
//   div {
//     margin: 10px;
//   }
// `

const loggedIn = true // true : 로그인 됨

const AppLayout = ({ children }) => {
  return (
    <>
      <div style={{ display: 'flex', margin: '10px' }}>
        <div key="home" style={{ marginRight: '10px' }}>
          <Link href="/">
            <a>홈</a>
          </Link>
        </div>
        <div key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </div>
        <div key="search">
          <input />
        </div>
      </div>
      {loggedIn ? <UserProfile /> : <LoginForm />}
      <div>{children}</div>
    </>
  )
}

AppLayout.proptypes = {
  children: proptypes.node
}

export default AppLayout
