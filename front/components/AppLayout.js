import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import proptypes from 'prop-types'

// const AppLayout_Container = styled.div`
//   display: flex;
//   color: blue;
//   margin: 10px;
//   div {
//     margin: 10px;
//   }
// `

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
      <Link href="/signup">
        <a>
          <button>회원가입</button>
        </a>
      </Link>
      {children}
    </>
  )
}

AppLayout.proptypes = {
  children: proptypes.node
}

export default AppLayout
