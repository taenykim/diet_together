import React from 'react'
import styled from 'styled-components'

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
        <div key="home">홈</div>
        <div key="profile">프로필</div>
        <div key="search">
          <input />
        </div>
      </AppLayout_Container>
      {children}
    </>
  )
}

export default AppLayout
