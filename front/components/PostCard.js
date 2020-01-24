import React from 'react'
import proptypes from 'prop-types'

const PostCard = ({ post }) => {
  return (
    <>
      <div key={+post.createdAt}>
        <div>{post.img && <img style={{ width: '20px' }} src={post.img}></img>}</div>
        <div> {post.User.nickname}</div>
        <div>{post.content}</div>
        <br />
      </div>
    </>
  )
}

PostCard.proptypes = {
  post: proptypes.shape({
    User: proptypes.object,
    content: proptypes.string,
    img: proptypes.string,
    createdAt: proptypes.object
  })
}

export default PostCard
