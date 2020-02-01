import React from 'react'
import NicknameEditForm from '../components/profile/NicknameEditForm'
import { useSelector } from 'react-redux'
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post'
import PostCard from '../components/index/PostCard'
import styled from 'styled-components'
import { RootState } from '../reducers'

const MainPage = styled.div`
  margin-top: 19px;
`

const profile = () => {
  const { mainPosts } = useSelector((state: RootState) => state.post)

  return (
    <MainPage>
      <NicknameEditForm />
      <div>
        <div>
          {mainPosts.map((c, i) => (
            <PostCard key={i} post={c} />
          ))}
        </div>
      </div>
    </MainPage>
  )
}

profile.getInitialProps = async context => {
  const state = context.store.getState()
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: state.user.me && state.user.me.id
  })
}

export default profile
//
