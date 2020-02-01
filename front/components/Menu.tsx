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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: rgb(231, 231, 231);
  & > div {
    background-color: white;
    display: flex;
    justify-content: flex-start;
    padding: 20px 20px 16px 36px;
    margin: 0px 40px 8px 60px;
    font-size: 18px;
    font-family: 'escore3';
    box-shadow: inset -3px -3px 7px #ffffffb0, inset 3px 3px 5px rgba(94, 104, 121, 0.692);
    border-radius: 5px;
    a {
      color: rgb(94, 94, 94);
      text-decoration: none;
    }
  }
  div:nth-child(1) {
    margin-top: 40px;
  }
  border-right: 1px solid rgb(148, 148, 148);
  border-top: 1px solid rgb(148, 148, 148);
  border-collapse: collapse;
  z-index: 10;
`
const SearchBar = styled.div`
  z-index: 5;
  position: fixed;
  left: 280px;
  width: 100vw;
  border-bottom: 1px solid rgb(148, 148, 148);
  border-top: 1px solid rgb(148, 148, 148);
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
        <div key="home">
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
