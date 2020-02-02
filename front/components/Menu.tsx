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
  background: #e0e5ec;
`

const Menu_Container = styled.div`
  position: sticky;
  color: rgb(94, 94, 94);
  top: 0px;
  width: 280px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  & > div {
    background-color: #e0e5ec;
    display: flex;
    justify-content: flex-start;
    padding: 20px 20px 16px 36px;
    margin: 0px 40px 8px 60px;
    font-size: 18px;
    font-family: 'escore4';
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: transparent;
    box-shadow: 9px 9px 16px rgba(163, 177, 198, 0.6), -9px -9px 16px rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    a {
      text-decoration: none;
      color: rgb(94, 94, 94);
    }
  }
  & > div:nth-child(1) {
    margin-top: 72px;
  }
  border-right: 1px solid rgb(148, 148, 148);
  border-top: 1px solid rgb(148, 148, 148);
  border-collapse: collapse;
  z-index: 10;
`
const SearchBar = styled.div`
  z-index: 5;
  position: fixed;
  display: flex;
  justify-content: flex-end;
  left: 280px;
  height: 40px;
  border-bottom: 1px solid rgb(148, 148, 148);
  border-top: 1px solid rgb(148, 148, 148);
`
// props 로 서칭바랑 컨텐츠 조절해보기!

const Content_Container = styled.div`
  margin: 50px 0px 0px 0px;
  width: calc(100vw - 280px);
  padding: 10px;
`

// children 은 Menu의 props 인 페이지들!
const Menu = ({ children }) => {
  const { me } = useSelector((state: RootState) => state.user)

  return (
    <FullContainer>
      <SearchBar key="search">
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
