import React, { useState } from 'react'
import AppLayout from '../components/AppLayout'
const signup = () => {
  const [id, setId] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [term, setTerm] = useState(false)

  const [passwordError, setPasswordError] = useState(false)
  const [termError, setTermError] = useState(false)

  const onSubmit = e => {
    e.preventDefault()
    if (password !== passwordCheck) {
      return setPasswordError(true)
    }
    if (!term) {
      return setTermError(true)
    }
    console.log({ id })
  }
  const onChangeId = e => {
    setId(e.target.value)
  }
  const onChangeNickname = e => {
    setNickname(e.target.value)
  }
  const onChangePassword = e => {
    setPassword(e.target.value)
  }
  const onChangepasswordCheck = e => {
    setPasswordError(e.target.value !== password)
    setPasswordCheck(e.target.value)
  }
  const onChangeTerm = e => {
    setTermError(false)
    setTerm(e.target.checked)
  }

  return (
    <>
      <AppLayout>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="user-id">아이디</label>
            <br />
            <input name="user-id" value={id} required onChange={onChangeId} />
          </div>
          <div>
            <label htmlFor="user-nickname">닉네임</label>
            <br />
            <input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label htmlFor="user-password-check">비밀번호</label>
            <br />
            <input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangepasswordCheck}
            />
            {passwordError && <div>비밀번호가 일치하지 않습니다.</div>}
          </div>
          <div>
            <input type="checkbox" name="user-term" checked={term} onChange={onChangeTerm} />
            체크박스
            {termError && <div>약관에 동의하셔야 합니다.</div>}
          </div>
          <div>
            <button type="submit">가입하기</button>
          </div>
        </form>
      </AppLayout>
    </>
  )
}

export default signup
