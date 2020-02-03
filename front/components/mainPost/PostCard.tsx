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
import { ProfileAvatar as UserAvatar, ProfileName as UserName } from '../Menu/UserProfile'
const PostCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  position: relative;
  border-radius: 10px;
  box-shadow: -6px -6px 20px rgba(255, 255, 255, 1), 6px 6px 20px rgba(0, 0, 0, 0.4);
  margin-bottom: 20px;
`

const UserAvatarAndName = styled.div`
  display: flex;
  padding: 10px 15px 10px 20px;
  margin-bottom: 10px;
  align-items: center;
  border-radius: 0px 0px 0px 0px;
`

const PostCardContent = styled.div`
  padding: 0px 15px 10px 20px;
  font-family: escore5;
  font-size: 13px;
  color: #555;
`

const PostCardSub = styled.div`
  font-family: escore5;
  font-size: 13px;
  display: flex;
  padding: 10px 15px 30px 20px;
  div {
    padding-right: 5px;
    cursor: pointer;
  }
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
  const myPost = id === post.User.id

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
        <UserAvatarAndName>
          <UserAvatar>
            <Link href="/profile" prefetch>
              <a>
                <img
                  style={{ width: '100%' }}
                  src="http://start.goodtime.co.kr/wp-content/uploads/2014/02/aspect_good.jpg"
                />
              </a>
            </Link>
          </UserAvatar>
          <UserName>
            <div>
              <Link
                href={{ pathname: '/user', query: { id: post.User.id } }}
                as={`/user/${post.User.id}`}
              >
                <a>{post.User.nickname}</a>
              </Link>
            </div>
          </UserName>
        </UserAvatarAndName>
        <PostCardContent>{post.content}</PostCardContent>
        {post.Images && post.Images[0] && <PostImages images={post.Images} />}

        <PostCardSub>
          <div onClick={onToggleComment}>댓글</div>
          <div onClick={onToggleComment}>{post.Comments ? post.Comments.length : 0}</div>
          <div // 나중에 스타일드 컴포넌트 스타일링 할 때, props 이용할 것.
            style={liked ? { color: 'red' } : { color: 'black' }}
            onClick={onToggleLike}
          >
            좋아요
          </div>
          <div onClick={onToggleLike}> {post.Likers ? post.Likers.length : 0}</div>
        </PostCardSub>
        {myPost && (
          <button
            style={{ position: 'absolute', top: 0, right: 0, background: 'orange', color: 'white' }}
            type="button"
            onClick={onRemovePost(post.id)}
          >
            삭제
          </button>
        )}
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
                      <div>닉네임 : {item.User && item.User.nickname}</div>
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
//
