import React from 'react'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux'

const index = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const mainPosts = useSelector(state => state.post.mainPosts)

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
