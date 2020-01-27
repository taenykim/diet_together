import React from 'react'
import { useSelector } from 'react-redux'
import proptypes from 'prop-types'
import { LOAD_POST_REQUEST } from '../reducers/post'

const Post = ({ id }) => {
  const { singlePost } = useSelector(state => state.post)
  return (
    <>
      <div>{singlePost.content}</div>
      <div>{singlePost.User.nickname}</div>
      <div>
        {singlePost.Images[0] && <img src={`http://localhost:3065/${singlePost.Images[0].src}`} />}
      </div>
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

Post.proptypes = {
  id: proptypes.number.isRequired
}

export default Post
