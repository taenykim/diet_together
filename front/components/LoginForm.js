import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { LOG_IN_REQUEST } from '../reducers/user'

const LoginForm = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const onChangeId = useCallback(e => {
    setId(e.target.value)
  }, [])

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value)
  }, [])

  const onSubmitForm = useCallback(
    e => {
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
      <form onSubmit={onSubmitForm}>
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
        <div>
          <button type="submit">로그인</button>
        </div>
        <Link href="/signup">
          <a>
            <button>회원가입</button>
          </a>
        </Link>
      </form>
    </>
  )
}

export default LoginForm
