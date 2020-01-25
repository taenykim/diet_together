import React from 'react'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux'

const index = () => {
  const { me } = useSelector(state => state.user)
  const mainPosts = useSelector(state => state.post.mainPosts)

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
