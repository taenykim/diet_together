import * as React from 'react'
import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  LOAD_COMMENTS_REQUEST,
  UNLIKE_POST_REQUEST,
  LIKE_POST_REQUEST,
  REMOVE_POST_REQUEST
} from '../../reducers/post'
import Link from 'next/link'
import PostImages from '../postCard/PostImages'
import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from '../../reducers/user'
import CommentForm from '../postCard/CommentForm'
import FollowButton from '../postCard/FollowButton'
import styled from 'styled-components'
import { RootState } from '../../reducers'

const PostCardContainer = styled.div`
  border: 1px solid black;
`
const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false)
  const id = useSelector((state: RootState) => state.user.me && state.user.me.id)
  const dispatch = useDispatch()
  ////////////////////////////////////
  // const postMemory = useRef(id)

  // console.log(post)

  // useEffect(() => {
  //   console.log(postMemory.current, id, postMemory === id)
  // }, [id])
  ////////////////////////////////////
  const liked = id && post.Likers && post.Likers.find(v => v.id === id)

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev)
    if (!commentFormOpened) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: post.id
      })
    }
  }, [])

  const onToggleLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다')
    }
    if (liked) {
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: post.id
      })
    } else {
      dispatch({
        type: LIKE_POST_REQUEST,
        data: post.id
      })
    }
  }, [id, post && post.id, liked])

  const onFollow = useCallback(
    userId => () => {
      dispatch({
        type: FOLLOW_USER_REQUEST,
        data: userId
      })
    },
    []
  )

  const onUnfollow = useCallback(
    userId => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId
      })
    },
    []
  )

  const onRemovePost = useCallback(
    userId => () => {
      dispatch({
        type: REMOVE_POST_REQUEST,
        data: userId
      })
    },
    []
  )

  return (
    <>
      <PostCardContainer>
        <div>{post.Images && post.Images[0] && <PostImages images={post.Images} />}</div>
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
        <button type="button" onClick={onToggleComment}>
          댓글
        </button>
        <button
          type="button"
          style={liked ? { color: 'red' } : { color: 'black' }}
          onClick={onToggleLike}
        >
          좋아요
        </button>
        <button type="button" onClick={onRemovePost(post.id)}>
          삭제
        </button>
        {<FollowButton post={post} onUnfollow={onUnfollow} onFollow={onFollow} />}
      </PostCardContainer>
      {commentFormOpened && (
        <>
          <div>
            <CommentForm post={post} />
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

export default PostCard
