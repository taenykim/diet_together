import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { LOG_OUT } from '../reducer/user'

const UserProfile = () => {
  const dispatch = useDispatch()
  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT
    })
  }, [])
  return (
    <>
      <div>내 정보창</div>
      <button onClick={onLogout}>로그아웃</button>
    </>
  )
}

export default UserProfile
