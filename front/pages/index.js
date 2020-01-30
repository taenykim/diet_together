import React, { useEffect, useCallback, useRef } from 'react'
import PostForm from '../components/index/PostForm'
import PostCard from '../components/index/PostCard'
import { useSelector, useDispatch } from 'react-redux'
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post'
import styled from 'styled-components'

const MainPage = styled.div`
  margin-top: 19px;
`
const index = () => {
  const { me } = useSelector(state => state.user)
  const { mainPosts, hasMorePost } = useSelector(state => state.post)
  const dispatch = useDispatch()
  const countRef = useRef([])

  const onScroll = useCallback(() => {
    console.log(
      window.scrollY,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight - 300
    )
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      console.log('hear')
      if (hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId
          })
          countRef.current.push(lastId)
        }
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
    <MainPage>
      {me && <PostForm />}
      {mainPosts.map((c, i) => {
        return <PostCard key={c.id} post={c} />
      })}
    </MainPage>
  )
}

index.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST
  })
}

export default index
