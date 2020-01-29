import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../reducers'

const FollowButton = ({ post, onUnfollow, onFollow }) => {
  const { me } = useSelector((state: RootState) => state.user)
  return !me || post.User.id === me.id ? null : me.Followings &&
    me.Followings.find(v => v.id === post.User.id) ? (
    <button onClick={onUnfollow(post.User.id)}>언팔로우</button>
  ) : (
    <button onClick={onFollow(post.User.id)}>팔로우</button>
  )
}

export default FollowButton
