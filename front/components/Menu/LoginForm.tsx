import * as React from 'react'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { LOG_IN_REQUEST } from '../../reducers/user'
import styled from 'styled-components'
import { RootState } from '../../reducers'

const LoginFormContainer = styled.form`
  padding: 20px 10px 10px 15px;
  input {
    border-radius: 3px;
  }
  label {
    width: 70px;
  }
  div {
    margin-bottom: 3px;
  }
`

const IdContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  input {
    width: 80px;
  }
`
const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  input {
    width: 80px;
  }
`
const LoginError = styled.div`
  color: red;
`
const LoginAndSignUpContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: stretch;
  & > button {
    width: 50%;
  }
  a {
    width: 50%;
  }
`
const LoginForm = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { logInErrorReason } = useSelector((state: RootState) => state.user)

  const onChangeId = useCallback(e => {
    setId(e.target.value)
  }, [])

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value)
  }, [])

  const onSubmitForm = useCallback(
    e => {
      // 리액트 state에서 리덕스 store로 전달!
      e.preventDefault()
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          userId: id,
          password
        }
      })
    },
    [id, password]
  )

  return (
    <>
      <LoginFormContainer onSubmit={onSubmitForm}>
        <IdContainer>
          <label htmlFor="user-id">아이디</label>
          <input name="user-id" value={id} onChange={onChangeId} required />
        </IdContainer>
        <PasswordContainer>
          <label htmlFor="user-password">비밀번호</label>
          <input
            name="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </PasswordContainer>
        {/* {console.log(logInErrorReason)} */}
        <LoginError>{logInErrorReason}</LoginError>
        <LoginAndSignUpContainer>
          <button style={{ cursor: 'pointer' }} type="submit">
            로그인
          </button>
          <Link href="/signup">
            <a>
              <button style={{ cursor: 'pointer', width: '100%' }}>회원가입</button>
            </a>
          </Link>
        </LoginAndSignUpContainer>
      </LoginFormContainer>
    </>
  )
}

export default LoginForm
//
