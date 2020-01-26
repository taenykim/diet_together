import React, { useEffect, useCallback } from 'react'
import NicknameEditForm from '../components/NicknameEditForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
  UNFOLLOW_USER_REQUEST
} from '../reducers/user'
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post'
import PostCard from '../components/PostCard'

const profile = () => {
  const dispatch = useDispatch()
  const { me, followingList, followerList } = useSelector(state => state.user)
  const { mainPosts } = useSelector(state => state.post)

  useEffect(() => {
    if (me) {
      dispatch({
        type: LOAD_FOLLOWERS_REQUEST,
        data: me.id
      })
      dispatch({
        type: LOAD_FOLLOWINGS_REQUEST,
        data: me.id
      })
      dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: me.id
      })
    }
  }, [me && me.id])

  const onUnfollow = useCallback(
    userId => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId
      })
    },
    []
  )

  const onRemoveFollower = useCallback(
    userId => () => {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: userId
      })
    },
    []
  )

  return (
    <>
      <NicknameEditForm />
      <div>
        <div>팔로잉목록</div>
        <div>
          {followingList.map(item => {
            return (
              <>
                {item.nickname}{' '}
                <button type="button" onClick={onUnfollow(item.id)}>
                  삭제
                </button>
              </>
            )
          })}
        </div>
        <div>팔로워목록</div>
        <div>
          {followerList.map(item => {
            return (
              <>
                {item.nickname}{' '}
                <button type="button" onClick={onRemoveFollower(item.id)}>
                  삭제
                </button>
              </>
            )
          })}
        </div>
        <div>
          {console.log(mainPosts)}
          {mainPosts.map(c => (
            <PostCard key={+c.createdAt} post={c} />
          ))}
        </div>
      </div>
    </>
  )
}

export default profile
