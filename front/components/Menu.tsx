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
  border-right: 1px solid rgb(148, 148, 148);
  border-top: 1px solid rgb(148, 148, 148);
  border-collapse: collapse;
  z-index: 10;
  background: #e0e5ec;
  & > div {
    position: relative;
    display: flex;
    justify-content: flex-start;
    padding: 20px 20px 16px 46px;
    margin: 0px 40px 8px 40px;
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
    a: hover {
      color: black;
    }
    & > a:nth-child(1):hover {
      color: rgb(173, 163, 13);
    }
  }
  & > div:hover {
    box-shadow: inset 3px 3px 7px rgba(136, 165, 191, 0.48), inset -3px -3px 7px #ffffff;
  }
  & > div:nth-child(1) {
    font-family: escore9;
    font-size: 30px;
    padding: 20px 20px 16px 14px;
    margin: 26px 40px 16px 40px;
    box-shadow: none;
    border: none;
  }
  & > div:nth-child(4) {
    padding: 0px 0px 0px 0px;
    border: 5px solid rgb(240, 240, 240);
    box-sizing: border-box;
  }
`
const SearchBar = styled.div`
  z-index: 5;
  padding: 10px;
  background: #e0e5ec;
  position: sticky;
  right: 0;
  top: 0;
  display: flex;
  justify-content: flex-end;
  height: 40px;
  border-bottom: 1px solid rgb(148, 148, 148);
  border-top: 1px solid rgb(148, 148, 148);
`
// props 로 서칭바랑 컨텐츠 조절해보기!

const Content_Container = styled.div`
  width: calc(100vw - 280px);
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  padding: 10px;
`

const MenuIcon = styled.img`
  position: absolute;
  width: 18px;
  top: 18px;
  left: 16px;
`

// children 은 Menu의 props 인 페이지들!
const Menu = ({ children }) => {
  const { me } = useSelector((state: RootState) => state.user)

  return (
    <FullContainer>
      <Menu_Container>
        <div style={{ cursor: 'pointer' }}>
          <Link href="/">
            <a>DIET TOGETHER</a>
          </Link>
        </div>
        <div key="tutorial">
          <MenuIcon src="https://image.flaticon.com/icons/svg/82/82648.svg"></MenuIcon>
          <Link href="/tutorial" prefetch>
            <a>튜토리얼</a>
          </Link>
        </div>
        <div key="home">
          <MenuIcon src="https://image.flaticon.com/icons/svg/82/82631.svg"></MenuIcon>
          <Link href="/">
            <a>홈</a>
          </Link>
        </div>
        <div> {me ? <UserProfile /> : <LoginForm />}</div>
        <div key="weight">
          <MenuIcon src="https://image.flaticon.com/icons/svg/82/82621.svg"></MenuIcon>
          <Link href="/weight" prefetch>
            <a>내 그래프</a>
          </Link>
        </div>
        <div key="like">
          <MenuIcon src="https://image.flaticon.com/icons/svg/82/82477.svg"></MenuIcon>
          <Link href="/like" prefetch>
            <a>좋아요</a>
          </Link>
        </div>
        <div key="appinfo">
          <MenuIcon src="https://image.flaticon.com/icons/svg/82/82302.svg"></MenuIcon>
          <Link href="/appinfo" prefetch>
            <a>앱 정보</a>
          </Link>
        </div>
      </Menu_Container>
      <Content_Container>
        <SearchBar key="search">
          <SearchingForm />
        </SearchBar>
        <Content>{children}</Content>
      </Content_Container>
    </FullContainer>
  )
}

export default Menu
//
