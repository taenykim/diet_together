import React, { useEffect } from 'react'
import SignUpForm from '../components/signup/SignUpForm'
import { useSelector, useDispatch } from 'react-redux'
import Router from 'next/router'
import { RootState } from '../reducers'
import Menu from '../components/Menu'
import { SIGN_UP_SIDEEFFECT } from '../reducers/user'

const signup = () => {
  const { isSignedUp, me } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isSignedUp) {
      confirm('회원가입이 성공했습니다. 튜토리얼을 하시겠습니까?') === true
        ? Router.push('/tutorial')
        : Router.push('/')
      dispatch({
        type: SIGN_UP_SIDEEFFECT
      })
    }
  }, [isSignedUp])

  return <Menu>{me ? <div>이미 회원이십니다 ^^</div> : <SignUpForm />}</Menu>
}

export default signup
//
