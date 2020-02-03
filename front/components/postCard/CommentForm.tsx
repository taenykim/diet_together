import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { ADD_COMMENT_REQUEST } from '../../reducers/post'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../reducers'

const CommentFormContainer = styled.form``
const CommentForm = ({ post }) => {
  const { commentAdded } = useSelector((state: RootState) => state.post)
  const { me } = useSelector((state: RootState) => state.user)
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
      <CommentFormContainer onSubmit={onSubmitComment}>
        <input value={commentText} onChange={onChangeCommentText} />
        <button type="submit">작성</button>
      </CommentFormContainer>
    </>
  )
}

export default CommentForm
//
