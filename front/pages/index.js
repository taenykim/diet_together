import React, { useEffect } from 'react'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { useSelector, useDispatch } from 'react-redux'
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post'

const index = () => {
  const { me } = useSelector(state => state.user)
  const { mainPosts } = useSelector(state => state.post)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST
    })
  }, [])

  return (
    <>
      {me && <PostForm />}
      {mainPosts.map((c, i) => {
        return <PostCard key={c} post={c} />
      })}
    </>
  )
}

export default index
