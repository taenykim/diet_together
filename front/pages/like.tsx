import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import PostCard from '../components/mainPost/PostCard'
import { LOAD_LIKED_POSTS_REQUEST } from '../reducers/post'
import { LOAD_USER_REQUEST } from '../reducers/user'
import { RootState } from '../reducers'
import Menu from '../components/Menu'

const MainPage = styled.div`
  margin-top: 19px;
`
const like = () => {
  const { mainPosts } = useSelector((state: RootState) => state.post)

  return (
    <Menu>
      <MainPage>
        {/** 이렇게 따로 빼주어야함. 바로 postcard 리턴하면 안됨 */}
        {mainPosts.map((c, i) => {
          return <PostCard key={c.id} post={c} />
        })}
      </MainPage>
    </Menu>
  )
}
like.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_LIKED_POSTS_REQUEST
  })
  context.store.dispatch({
    type: LOAD_USER_REQUEST
  })
}

export default like
//
