import * as React from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LOG_OUT_REQUEST } from '../../reducers/user'
import Link from 'next/link'
import styled from 'styled-components'
import { RootState } from '../../reducers'

const UserProfileContainer = styled.div`
  width: 100%;
  display: flex;

  flex-direction: column;
  & > button {
    margin-top: 6px;
  }
`
const ProfileAvatarAndName = styled.div`
  display: flex;
  padding: 10px 15px 10px 20px;
  margin-bottom: 10px;
  align-items: center;
  background: rgb(248, 248, 248);
  border-radius: 0px 0px 0px 0px;
`
const ProfileAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 30%;
  overflow: hidden;
  box-shadow: 4px 4px 8px rgb(151, 151, 151);
`
const ProfileName = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  & > div {
    font-family: escore5;
    font-size: 14px;
    margin-left: 10px;
  }
`

const ProfileDesc = styled.div`
  font-size: 13px;
  font-family: escore4;
  display: flex;
  flex-direction: column;
  & > a {
    align-self: center;
    font-size: 15px;
    font-family: escore6;
  }
  div {
    margin-left: 13px;
    margin-bottom: 3px;
  }
  & > div:nth-child(2) {
    margin-top: 10px;
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
      <ProfileAvatarAndName>
        <ProfileAvatar>
          <Link href="/profile" prefetch>
            <a>
              <img
                style={{ width: '100%' }}
                src="http://start.goodtime.co.kr/wp-content/uploads/2014/02/aspect_good.jpg"
              />
            </a>
          </Link>
        </ProfileAvatar>
        <ProfileName>
          <div>
            <Link href="/profile" prefetch>
              <a>{me.nickname}</a>
            </Link>
          </div>
        </ProfileName>
      </ProfileAvatarAndName>
      <ProfileDesc>
        <Link href="/profile" prefetch>
          <a>"나는 다이어트 한다!!"</a>
        </Link>
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
      </ProfileDesc>

      <button onClick={onLogout}>로그아웃</button>
    </UserProfileContainer>
  )
}

export default UserProfile
//
