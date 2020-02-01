import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import { SIGN_UP_REQUEST } from '../../reducers/user'
import { RootState } from '../../reducers'

const SignUpForm = () => {
  const [id, setId] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [term, setTerm] = useState(false)

  const [passwordError, setPasswordError] = useState(false)
  const [termError, setTermError] = useState(false)

  const dispatch = useDispatch()
  const { me } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (me) {
      alert('로그인했으니 메인페이지로 이동')
      Router.push('/')
    }
  }, [me && me.id])

  const onSubmit = useCallback(
    e => {
      e.preventDefault()
      if (password !== passwordCheck) {
        return setPasswordError(true)
      }
      if (!term) {
        return setTermError(true)
      }
      return dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          userId: id,
          password,
          nickname: nickname
        }
      })
    },
    [id, nickname, password, passwordCheck, term]
  )

  const onChangeId = useCallback(e => {
    setId(e.target.value)
  }, [])

  const onChangeNickname = useCallback(e => {
    setNickname(e.target.value)
  }, [])

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value)
  }, [])

  const onChangepasswordCheck = useCallback(
    e => {
      setPasswordError(e.target.value !== password)
      setPasswordCheck(e.target.value)
    },
    [password]
  )

  const onChangeTerm = useCallback(e => {
    setTermError(false)
    setTerm(e.target.checked)
  }, [])

  if (me) {
    return null
  }
  return (
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
  )
}

export default SignUpForm
