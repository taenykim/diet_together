import React from 'react'
import WeightView from '../components/profile/WeightView'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../reducers'
import Menu from '../components/Menu'

const MainPage = styled.div`
  margin-top: 19px;
`
const weight = () => {
  const Weights = useSelector((state: RootState) => state.user.me && state.user.me.Weights)
  return (
    <Menu>
      <MainPage>
        <WeightView weights={Weights} />
      </MainPage>
    </Menu>
  )
}

export default weight
//
