import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LOG_OUT_REQUEST } from '../reducers/user'

const UserProfile = () => {
  const { me } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST
    })
  }, [])
  return (
    <>
      <div>내 이름 : {me.nickname}</div>
      <div>게시물 수 : {me.Posts.length}</div>
      <div>팔로잉 수 : {me.Followings.length}</div>
      <div>팔로워 수 : {me.Followers.length}</div>
      <button onClick={onLogout}>로그아웃</button>
    </>
  )
}

export default UserProfile
