import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { WEIGHT_POST_REQUEST } from '../reducers/user'

const WeightView = () => {
  const [weight, setWeight] = useState('')
  const dispatch = useDispatch()

  const onChangeWeight = useCallback(e => {
    setWeight(e.target.value)
  }, [])
  const onSubmitWeight = useCallback(
    e => {
      e.preventDefault()
      dispatch({
        type: WEIGHT_POST_REQUEST,
        data: weight
      })
    },
    [weight]
  )
  return (
    <>
      <form onSubmit={onSubmitWeight}>
        <label htmlFor="weight">몸무게</label>
        <input name="weight" value={weight} onChange={onChangeWeight} />
        <button type="submit">추가</button>
      </form>
      <div>여기몸무게</div>
    </>
  )
}

export default WeightView
