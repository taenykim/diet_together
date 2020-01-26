import React, { useEffect } from 'react'
import proptypes from 'prop-types'
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post'
import { LOAD_USER_REQUEST } from '../reducers/user'
import PostCard from '../components/PostCard'
import { useDispatch, useSelector } from 'react-redux'

const user = ({ id }) => {
  const dispatch = useDispatch()
  const { mainPosts } = useSelector(state => state.post)
  const { userInfo } = useSelector(state => state.user)

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      data: id
    })
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: id
    })
  }, [])

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

user.proptypes = {
  id: proptypes.number.isRequired
}

user.getInitialProps = async context => {
  console.log(context.query.id)
  return { id: parseInt(context.query.id, 10) }
}

export default user
