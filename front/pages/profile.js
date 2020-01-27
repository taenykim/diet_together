import React, { useCallback } from 'react'
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
  const { followingList, followerList, hasMoreFollower, hasMoreFollowing } = useSelector(
    state => state.user
  )
  const { mainPosts } = useSelector(state => state.post)

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

  const loadMoreFollowings = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
      offset: followingList.length
    })
  }, [followingList.length])

  const loadMoreFollowers = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
      offset: followerList.length
    })
  }, [followerList.length])

  return (
    <>
      <NicknameEditForm />
      <div>
        <div>팔로잉목록</div>
        <div>
          {followingList.map((item, i) => {
            return (
              <>
                {item.nickname}
                <button key={i} type="button" onClick={onUnfollow(item.id)}>
                  삭제
                </button>
              </>
            )
          })}
        </div>
        {hasMoreFollowing && (
          <button type="button" style={{ width: '200px' }} onClick={loadMoreFollowings}>
            더보기
          </button>
        )}
        <div>팔로워목록</div>
        <div>
          {followerList.map((item, i) => {
            return (
              <>
                {item.nickname}
                <button key={i} type="button" onClick={onRemoveFollower(item.id)}>
                  삭제
                </button>
              </>
            )
          })}
        </div>
        {hasMoreFollower && (
          <button type="button" style={{ width: '200px' }} onClick={loadMoreFollowers}>
            더보기
          </button>
        )}
        <div>
          {mainPosts.map((c, i) => (
            <PostCard key={i} post={c} />
          ))}
        </div>
      </div>
    </>
  )
}

profile.getInitialProps = async context => {
  const state = context.store.getState()
  context.store.dispatch({
    type: LOAD_FOLLOWERS_REQUEST,
    data: state.user.me && state.user.me.id
  })
  context.store.dispatch({
    type: LOAD_FOLLOWINGS_REQUEST,
    data: state.user.me && state.user.me.id
  })
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: state.user.me && state.user.me.id
  })
}

export default profile
