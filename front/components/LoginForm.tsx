import * as React from 'react'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { LOG_IN_REQUEST } from '../reducers/user'
import styled from 'styled-components'
import { RootState } from '../reducers'

const LoginFormContainer = styled.form`
  border: 1px solid black;
`
const LoginError = styled.div`
  color: red;
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
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <input name="user-id" value={id} onChange={onChangeId} required />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <input
            name="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        {console.log(logInErrorReason)}
        <LoginError>{logInErrorReason}</LoginError>
        <div>
          <button type="submit">로그인</button>
        </div>
        <Link href="/signup">
          <a>
            <button>회원가입</button>
          </a>
        </Link>
      </LoginFormContainer>
    </>
  )
}

export default LoginForm
//
