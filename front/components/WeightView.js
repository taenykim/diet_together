import React, { useState, useCallback } from 'react'

const WeightView = () => {
  const [weight, setWeight] = useState('')
  const onChangeWeight = useCallback(e => {
    setWeight(e.target.value)
  }, [])
  const onSubmitWeight = () => {}
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
