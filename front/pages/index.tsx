import React, { useEffect, useCallback, useRef } from 'react'
import PostForm from '../components/index/PostForm'
import PostCard from '../components/index/PostCard'
import { useSelector, useDispatch } from 'react-redux'
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post'
import styled from 'styled-components'
import { RootState } from '../reducers'
import Menu from '../components/Menu'

const MainPage = styled.div`
  margin-top: 19px;
`
const index = () => {
  const { me } = useSelector((state: RootState) => state.user)
  const { mainPosts, hasMorePost } = useSelector((state: RootState) => state.post)
  const dispatch = useDispatch()
  // const countRef = useRef([]) // 다시

  const onScroll = useCallback(() => {
    // console.log(
    //   window.scrollY, // 현재 스크롤 위치
    //   document.documentElement.clientHeight, // 브라우저 화면 높이
    //   document.documentElement.scrollHeight - 300 // 현재 페이지 총 길이
    // )
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id
        // if (!countRef.current.includes(lastId)) {
        dispatch({
          type: LOAD_MAIN_POSTS_REQUEST,
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
        {me && <PostForm />}
        {mainPosts.map((c, i) => {
          return <PostCard key={c.id} post={c} />
        })}
      </MainPage>{' '}
    </Menu>
  )
}

index.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST
  })
}

export default index
//
