import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LOG_OUT } from '../reducers/user'

const UserProfile = () => {
  const { me } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT
    })
  }, [])
  return (
    <>
      <div>내 이름 : {me.nickname}</div>
      <button onClick={onLogout}>로그아웃</button>
    </>
  )
}

export default UserProfile
