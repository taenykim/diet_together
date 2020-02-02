import React, { useEffect } from 'react'
import styled from 'styled-components'
import SignUpForm from '../components/signup/SignUpForm'
import { useSelector } from 'react-redux'
import Router from 'next/router'
import { RootState } from '../reducers'
import Menu from '../components/Menu'

const MainPage = styled.div`
  margin-top: 19px;
`

const signup = () => {
  const { isSignedUp } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (isSignedUp) {
      confirm('튜토리얼 페이지 가쉴?') === true ? Router.push('/tutorial') : null
    }
  }, [isSignedUp])

  return (
    <Menu>
      <MainPage>
        <SignUpForm />
      </MainPage>
    </Menu>
  )
}

export default signup
//
