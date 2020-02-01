import React, { useEffect } from 'react'
import styled from 'styled-components'
import SignUpForm from '../components/signup/SignUpForm'
import { useSelector } from 'react-redux'
import Router from 'next/router'

const MainPage = styled.div`
  margin-top: 19px;
`
const signup = () => {
  const { isSignedUp } = useSelector(state => state.user)

  useEffect(() => {
    if (isSignedUp) {
      alert('튜토리얼 페이지로 갑니다(물어보는 창이면 더 좋을듯)')
      Router.push('/tutorial')
    }
  }, [isSignedUp])

  return (
    <MainPage>
      <SignUpForm />
    </MainPage>
  )
}

export default signup
//
