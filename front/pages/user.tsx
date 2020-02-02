import React, { useCallback, useEffect } from 'react'
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post'
import { LOAD_USER_REQUEST } from '../reducers/user'
import PostCard from '../components/mainPost/PostCard'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../reducers'
import Menu from '../components/Menu'

const user = () => {
  const { userInfo } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const { hasMorePost, mainPosts } = useSelector((state: RootState) => state.post)

  const onScroll = useCallback(() => {
    // console.log(
    //   window.scrollY, // 현재 스크롤 위치
    //   document.documentElement.clientHeight, // 브라우저 화면 높이
    //   document.documentElement.scrollHeight - 300 // 현재 페이지 총 길이
    // )
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 260
    ) {
      if (hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id
        console.log(lastId)
        // if (!countRef.current.includes(lastId)) {
        dispatch({
          type: LOAD_USER_POSTS_REQUEST,
          data: userInfo.id,
          lastId
        })
        // countRef.current.push(lastId)
        // }
      }
    }
  }, [hasMorePost, mainPosts.length])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [mainPosts.length])

  return (
    <Menu>
      {console.log(userInfo)}
      <div>{userInfo ? <div>닉넴 : {userInfo.nickname}</div> : null}</div>
      <div>{userInfo ? <div>포슽 : {userInfo.Posts}</div> : null}</div>
      <div>{userInfo ? <div>팔로잉ㅇ : {userInfo.following}</div> : null}</div>
      <div>{userInfo ? <div>팔로웡 : {userInfo.follower}</div> : null}</div>
      <div>
        {mainPosts.map(c => (
          <PostCard key={c.id} post={c} />
        ))}
      </div>
    </Menu>
  )
}

user.getInitialProps = async context => {
  const id = parseInt(context.query.id, 10)
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: id
  })
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: id
  })
  return { id }
}

export default user
//
