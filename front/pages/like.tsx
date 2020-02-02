import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import PostCard from '../components/mainPost/PostCard'
import { LOAD_LIKED_POSTS_REQUEST } from '../reducers/post'
import { RootState } from '../reducers'
import Menu from '../components/Menu'

const MainPage = styled.div`
  margin-top: 19px;
`
const like = () => {
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
        // if (!countRef.current.includes(lastId)) {
        dispatch({
          type: LOAD_LIKED_POSTS_REQUEST,
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
      <MainPage>
        {console.log('렌더링')}
        {mainPosts.map((c, i) => {
          return <PostCard key={c.id} post={c} />
        })}
      </MainPage>
    </Menu>
  )
}
like.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_LIKED_POSTS_REQUEST
  })
}

export default like
//
