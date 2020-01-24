import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const AppLayout_Container = styled.div`
  display: flex;
  margin: 10px;
  div {
    margin: 10px;
  }
`

const AppLayout = ({ children }) => {
  return (
    <>
      <AppLayout_Container>
        <div key="home">
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
      </AppLayout_Container>
      <Link href="/signup">
        <a>
          <button>회원가입</button>
        </a>
      </Link>
      {children}
    </>
  )
}

export default AppLayout
