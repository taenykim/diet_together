import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../reducers'

const FollowButton = ({ post, onUnfollow, onFollow }) => {
  const { me } = useSelector((state: RootState) => state.user)
  return !me || post.User.id === me.id ? null : me.Followings && // 익숙하지않음..
    me.Followings.find(v => v.id === post.User.id) ? (
    <button
      style={{ position: 'absolute', top: 0, right: 0, background: 'red', color: 'white' }}
      onClick={onUnfollow(post.User.id)}
    >
      언팔로우
    </button>
  ) : (
    <button
      style={{ position: 'absolute', top: 0, right: 0, background: 'dodgerblue', color: 'white' }}
      onClick={onFollow(post.User.id)}
    >
      팔로우
    </button>
  )
}

export default FollowButton
//
