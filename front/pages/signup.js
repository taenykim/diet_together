import React from 'react'
import styled from 'styled-components'
import SignUpForm from '../components/signup/SignUpForm'

const MainPage = styled.div`
  margin-top: 19px;
`
const signup = () => {
  return (
    <MainPage>
      <SignUpForm />
    </MainPage>
  )
}

export default signup
