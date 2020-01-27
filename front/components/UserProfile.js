import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LOG_OUT_REQUEST } from '../reducers/user'
import Link from 'next/link'

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
      <Link href="/profile" prefetch>
        <a>
          <div>내 이름 : {me.nickname}</div>
        </a>
      </Link>
      <div>게시물 수 : {me.Posts.length}</div>
      <div>팔로잉 수 : {me.Followings.length}</div>
      <div>팔로워 수 : {me.Followers.length}</div>
      <button onClick={onLogout}>로그아웃</button>
    </>
  )
}

export default UserProfile
