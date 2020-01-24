import React, { useEffect } from 'react'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { LOG_IN_REQUEST } from '../reducer/user'

const index = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const mainPosts = useSelector(state => state.post.mainPosts)
  useEffect(() => {
    dispatch({ type: LOG_IN_REQUEST })
  }, [])

  return (
    <>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((c, i) => {
        return <PostCard key={c} post={c} />
      })}
    </>
  )
}

export default index
