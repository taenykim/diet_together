import React from 'react'
import { useSelector } from 'react-redux'
import { LOAD_POST_REQUEST } from '../reducers/post'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Menu from '../components/Menu'

const MainPage = styled.div`
  margin-top: 19px;
`

const Post = ({ id }) => {
  const { singlePost } = useSelector(state => state.post)
  return (
    <>
      <Helmet
        title={`${singlePost.User.nickname}님의 게시글`}
        description={singlePost.content}
        meta={[
          {
            name: 'description',
            content: singlePost.content
          },
          {
            property: 'og:title',
            content: `${singlePost.User.nickname}님의 게시글`
          },
          {
            property: 'og:description',
            content: singlePost.content
          },
          {
            property: 'og:image',
            content: singlePost.Images[0] && `${backUrl}/${singlePost.Images[0].src}`
          },
          {
            property: 'og:url',
            content: `${backUrl}/post/${id}`
          }
        ]}
      />
      <Menu>
        <MainPage>
          <div>{singlePost.content}</div>
          <div>{singlePost.User.nickname}</div>
          <div>
            {singlePost.Images[0] && <img src={`${backUrl}/${singlePost.Images[0].src}`} />}
          </div>
        </MainPage>
      </Menu>
    </>
  )
}

Post.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.query.id
  })
  return { id: parseInt(context.query.id, 10) }
}

export default Post
//
