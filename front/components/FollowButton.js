import React from 'react'
import proptypes from 'prop-types'
import { useSelector } from 'react-redux'

const FollowButton = ({ post, onUnfollow, onFollow }) => {
  const { me } = useSelector(state => state.user)
  return !me || post.User.id === me.id ? null : me.Followings &&
    me.Followings.find(v => v.id === post.User.id) ? (
    <button onClick={onUnfollow(post.User.id)}>언팔로우</button>
  ) : (
    <button onClick={onFollow(post.User.id)}>팔로우</button>
  )
}

FollowButton.proptypes = {
  post: proptypes.object.isRequired,
  onUnfollow: proptypes.func.isRequired,
  onFollow: proptypes.func.isRequired
}

export default FollowButton
