import React, { useCallback } from 'react'
import styled from 'styled-components'
import { LOAD_FOLLOWERS_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reducers'
import Menu from '../components/Menu'

const MainPage = styled.div`
  margin-top: 19px;
`

const followers = () => {
  const { followerList, hasMoreFollower } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const loadMoreFollowers = useCallback(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
      offset: followerList.length
    })
  }, [followerList.length])

  const onRemoveFollower = useCallback(
    userId => () => {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: userId
      })
    },
    []
  )

  return (
    <Menu>
      <MainPage>
        <div>팔로워목록</div>
        <div>
          {followerList.map((item, i) => {
            return (
              <>
                {item.nickname}
                <button key={i} type="button" onClick={onRemoveFollower(item.id)}>
                  삭제
                </button>
              </>
            )
          })}
        </div>
        {hasMoreFollower && (
          <button type="button" style={{ width: '200px' }} onClick={loadMoreFollowers}>
            더보기
          </button>
        )}
      </MainPage>{' '}
    </Menu>
  )
}

followers.getInitialProps = async context => {
  const state = context.store.getState()
  context.store.dispatch({
    type: LOAD_FOLLOWERS_REQUEST,
    data: state.user.me && state.user.me.id
  })
}

export default followers
