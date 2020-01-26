import React from 'react'
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post'
import { LOAD_USER_REQUEST } from '../reducers/user'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux'

const user = () => {
  const { mainPosts } = useSelector(state => state.post)
  const { userInfo } = useSelector(state => state.user)

  return (
    <>
      <div>{userInfo ? userInfo.nickname : null}</div>
      <div>
        {mainPosts.map(c => (
          <PostCard key={+c.createdAt} post={c} />
        ))}
      </div>
    </>
  )
}

user.getInitialProps = async context => {
  const id = parseInt(context.query.id, 10)
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: id
  })
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: id
  })
  return { id }
}

export default user
