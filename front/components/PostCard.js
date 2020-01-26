import React, { useState, useCallback, useEffect } from 'react'
import proptypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST } from '../reducers/post'
import Link from 'next/link'

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false)
  const [commentText, setCommentText] = useState('')
  const { me } = useSelector(state => state.user)
  const { commentAdded } = useSelector(state => state.post)
  const dispatch = useDispatch()

  useEffect(() => {
    setCommentText('')
  }, [commentAdded === true])

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev)
    if (!commentFormOpened) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: post.id
      })
    }
  }, [])

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

  return (
    <>
      <div key={+post.id}>
        <div>
          {post.Images[0] && (
            <img
              style={{ width: '100px' }}
              src={'http://localhost:3065/' + post.Images[0].src}
            ></img>
          )}
        </div>
        <div>
          <Link
            href={{ pathname: '/user', query: { id: post.User.id } }}
            as={`/user/${post.User.id}`}
          >
            <a>{post.User.nickname}</a>
          </Link>
        </div>
        <div>{post.content}</div>
        <br />
        <button onClick={onToggleComment}>댓글</button>
      </div>
      {commentFormOpened && (
        <>
          <div>
            <form onSubmit={onSubmitComment}>
              <input value={commentText} onChange={onChangeCommentText} />
              <button type="submit">작성</button>
            </form>
          </div>
          <div>
            <div>{post.Comments ? post.Comments.length : 0}개의 댓글</div>
            <div>
              {/* {console.log(post.Comments)} */}
              {post.Comments &&
                post.Comments.map(item => {
                  return (
                    <>
                      <br />
                      <div>닉네임 : {item.User.nickname}</div>
                      <div>댓글내용 : {item.content}</div>
                      <br />
                    </>
                  )
                })}
            </div>
          </div>
        </>
      )}
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
