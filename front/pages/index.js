import React from 'react'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'

const loggedIn = true
const mainPosts = [
  {
    createAt: 1,
    User: {
      id: 1,
      nickname: '김태은'
    },
    img:
      'https://images.velog.io/images/kimtaeeeny/profile/17991380-0b3d-11ea-a24a-5f4ee8031413/KakaoTalk20191120112528625.jpg',
    content: '게시글!'
  },
  {
    createAt: 2,
    User: {
      id: 2,
      nickname: '우왕왕'
    },
    img:
      'https://images.velog.io/images/kimtaeeeny/profile/17991380-0b3d-11ea-a24a-5f4ee8031413/KakaoTalk20191120112528625.jpg',
    content: '게시글2!'
  }
]

const index = () => {
  return (
    <>
      {loggedIn && <PostForm />}
      {mainPosts.map((c, i) => {
        return <PostCard key={c} post={c} />
      })}
    </>
  )
}

export default index
