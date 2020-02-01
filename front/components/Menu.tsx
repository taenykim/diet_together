import * as React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import LoginForm from './Menu/LoginForm'
import UserProfile from './Menu/UserProfile'
import { useSelector } from 'react-redux'
import SearchingForm from './Menu/SearchingForm'
import { RootState } from '../reducers'

const FullContainer = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: stretch;
`

const Menu_Container = styled.div`
  position: sticky;
  top: 0px;
  width: 280px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > div {
    display: flex;
    justify-content: flex-start;
    padding-left: 80px;
    padding-right: 60px;
    font-size: 16px;
    font-family: 'escore7';
  }
  div:nth-child(1) {
    margin-top: 30px;
  }
  border-right: 2px solid #444;
  border-top: 2px solid #444;
  border-collapse: collapse;
  z-index: 10;
`
const SearchBar = styled.div`
  z-index: 5;
  position: fixed;
  left: 280px;
  width: 100vw;
  border-bottom: 2px solid #444;
  border-top: 2px solid #444;
`

const HomeIcon = styled.img`
  position: fixed;
  width: 19px;
  height: 19px;
`

const Content_Container = styled.div`
  margin-top: 50px;
`

// children 은 Menu의 props 인 페이지들!
const Menu = ({ children }) => {
  const { me } = useSelector((state: RootState) => state.user)

  return (
    <FullContainer>
      <SearchBar key="search">
        <Link href="/">
          <a>
            <HomeIcon src="https://image.flaticon.com/icons/svg/2502/2502945.svg" />
          </a>
        </Link>
        <SearchingForm />
      </SearchBar>
      <Menu_Container>
        <div key="tutorial">
          <Link href="/tutorial" prefetch>
            <a>튜토리얼</a>
          </Link>
        </div>
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
      </Menu_Container>
      <Content_Container>{children}</Content_Container>
    </FullContainer>
  )
}

export default Menu
//
