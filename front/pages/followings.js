import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { UNFOLLOW_USER_REQUEST, LOAD_FOLLOWINGS_REQUEST } from '../reducers/user'

const MainPage = styled.div`
  margin-top: 19px;
`

const followings = () => {
  const dispatch = useDispatch()
  const { followingList, hasMoreFollowing } = useSelector(state => state.user)

  const onUnfollow = useCallback(
    userId => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId
      })
    },
    []
  )

  const loadMoreFollowings = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
      offset: followingList.length
    })
  }, [followingList.length])

  return (
    <MainPage>
      <div>팔로잉목록</div>
      <div>
        {followingList.map((item, i) => {
          return (
            <>
              {item.nickname}
              <button key={i} type="button" onClick={onUnfollow(item.id)}>
                삭제
              </button>
            </>
          )
        })}
      </div>
      {hasMoreFollowing && (
        <button type="button" style={{ width: '200px' }} onClick={loadMoreFollowings}>
          더보기
        </button>
      )}
    </MainPage>
  )
}

followings.getInitialProps = async context => {
  const state = context.store.getState()
  context.store.dispatch({
    type: LOAD_FOLLOWINGS_REQUEST,
    data: state.user.me && state.user.me.id
  })
}

export default followings
