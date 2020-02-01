import * as React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import LoginForm from './Menu/LoginForm'
import UserProfile from './Menu/UserProfile'
import { useSelector } from 'react-redux'
import SearchingForm from './Menu/SearchingForm'
import { RootState } from '../reducers'

const Menu_Container = styled.div`
  margin-top: 19px;
  display: flex;
  flex-direction: column;
  div {
    padding: 10px;
  }
  border: 2px solid #444;
`
const SearchBar = styled.div`
  position: fixed;
  width: 100vw;
  border: 2px solid #444;
`

const HomeIcon = styled.img`
  position: fixed;
`

const FullContainer = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: stretch;
`

// children 은 Menu의 props 인 페이지들!
const Menu = ({ children }) => {
  const { me } = useSelector((state: RootState) => state.user)

  return (
    <FullContainer>
      <SearchBar key="search">
        <Link href="/">
          <a>
            <HomeIcon src="localhost:3060/favicon.ico" /> {/*아직못불러옴*/}
          </a>
        </Link>
        <SearchingForm />
      </SearchBar>
      <Menu_Container>
        <div key="home" style={{ marginRight: '10px' }}>
          <Link href="/">
            <a>홈</a>
          </Link>
        </div>
        <div> {me ? <UserProfile /> : <LoginForm />}</div>
        <div key="weight">
          <Link href="/weight" prefetch>
            <a>내 그래프</a>
          </Link>
        </div>
        <div key="like">
          <Link href="/like" prefetch>
            <a>좋아요</a>
          </Link>
        </div>
        <div key="appinfo">
          <Link href="/appinfo" prefetch>
            <a>앱 정보</a>
          </Link>
        </div>
        <div key="tutorial">
          <Link href="/tutorial" prefetch>
            <a>튜토리얼</a>
          </Link>
        </div>
      </Menu_Container>
      <div>{children}</div>
    </FullContainer>
  )
}

export default Menu
//
