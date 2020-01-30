import * as React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import LoginForm from './LoginForm'
import UserProfile from './UserProfile'
import { useSelector } from 'react-redux'
import SearchingForm from './SearchingForm'
import { RootState } from '../reducers'
import Router from 'next/router'

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

const MENU = ({ children }) => {
  const { me } = useSelector((state: RootState) => state.user)

  return (
    <>
      <SearchBar key="search">
        <Link href="/">
          <a>
            <HomeIcon src="localhost:3060/favicon.ico" />
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
        <div key="profile">
          <Link href="/profile" prefetch>
            <a>프로필</a>
          </Link>
        </div>
        <div> {me ? <UserProfile /> : <LoginForm />}</div>
        <div key="like">
          <Link href="/like" prefetch>
            <a>좋아요</a>
          </Link>
        </div>
      </Menu_Container>
      <div>{children}</div>
    </>
  )
}

export default MENU
