import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import PostCard from '../components/index/PostCard'
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post'

const MainPage = styled.div`
  margin-top: 19px;
`
const like = () => {
  const { mainPosts } = useSelector(state => state.post)
  const tmpPosts = []
  const { Liked } = useSelector(state => state.user.me)
  console.log(mainPosts, Liked)
  return (
    <MainPage>
      {/** 이렇게 따로 빼주어야함. 바로 postcard 리턴하면 안됨 */}
      {mainPosts.map((c, i) => {
        Liked.map(v => {
          v.id == c.id ? tmpPosts.push(c) : null
        })
      })}
      {tmpPosts.map((c, i) => {
        return <PostCard key={c.id} post={c} />
      })}
    </MainPage>
  )
}
like.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST
  })
}

export default like
//
