import * as React from 'react'
import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { WEIGHT_POST_REQUEST, WEIGHT_DELETE_REQUEST } from '../reducers/user'

const WeightView = ({ weights }) => {
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
  const onRemoveWeight = useCallback(
    weight => () => {
      dispatch({
        type: WEIGHT_DELETE_REQUEST,
        data: weight
      })
    },
    []
  )
  return (
    <>
      <form onSubmit={onSubmitWeight}>
        <label htmlFor="weight">몸무게</label>
        <input name="weight" value={weight} onChange={onChangeWeight} />
        <button type="submit">추가</button>
      </form>
      <div>
        {weights &&
          weights.map(v => {
            return (
              <span>
                {v.weight}
                <button type="button" onClick={onRemoveWeight(v.id)}></button>
              </span>
            )
          })}
      </div>
    </>
  )
}

export default WeightView
