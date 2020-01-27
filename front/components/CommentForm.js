import React, { useCallback, useEffect, useState } from 'react'
import { ADD_COMMENT_REQUEST } from '../reducers/post'
import { useSelector, useDispatch } from 'react-redux'
import proptypes from 'prop-types'

const CommentForm = ({ post }) => {
  const { commentAdded } = useSelector(state => state.post)
  const { me } = useSelector(state => state.user)
  const [commentText, setCommentText] = useState('')
  const dispatch = useDispatch()

  const onChangeCommentText = useCallback(e => {
    setCommentText(e.target.value)
  }, [])

  const onSubmitComment = useCallback(
    e => {
      e.preventDefault()
      if (!me) {
        return alert('로그인이 필요합니다')
      }
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          postId: post.id,
          content: commentText
        }
      })
    },
    [me && me.id, commentText]
  )

  useEffect(() => {
    setCommentText('')
  }, [commentAdded === true])

  return (
    <>
      <form onSubmit={onSubmitComment}>
        <input value={commentText} onChange={onChangeCommentText} />
        <button type="submit">작성</button>
      </form>
    </>
  )
}

CommentForm.proptypes = {
  post: proptypes.object.isRequired
}

export default CommentForm
