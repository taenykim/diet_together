import * as React from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LOG_OUT_REQUEST } from '../../reducers/user'
import Link from 'next/link'
import styled from 'styled-components'
import { RootState } from '../../reducers'

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    margin-bottom: 2px;
  }
  & > button {
    margin-top: 6px;
  }
`

const UserProfile = () => {
  const { me } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST
    })
  }, [])
  return (
    <UserProfileContainer>
      <div>
        <Link href="/profile" prefetch>
          <a>내 이름 : {me.nickname}</a>
        </Link>
      </div>
      <div>
        <Link href="/profile" prefetch>
          <a>게시물 수 : {me.Posts.length}</a>
        </Link>
      </div>
      <div>
        <Link href="/followings">
          <a>팔로잉 수 : {me.Followings.length}</a>
        </Link>
      </div>
      <div>
        <Link href="/followers">
          <a>팔로워 수 : {me.Followers.length}</a>
        </Link>
      </div>
      <button onClick={onLogout}>로그아웃</button>
    </UserProfileContainer>
  )
}

export default UserProfile
//
