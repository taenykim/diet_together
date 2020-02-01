import * as React from 'react'
import { useState, useCallback } from 'react'
import Router from 'next/router'
import styled from 'styled-components'

const SearchingFormContainer = styled.form`
  display: flex;
  background-color: white;
`

const SearchingForm = () => {
  const [keyword, setKeyword] = useState('')

  const onChangeKeyword = useCallback(e => {
    setKeyword(e.target.value)
  }, [])

  const onSubmitKeyword = e => {
    e.preventDefault()
    // console.log('keyword', keyword, 'e', e)
    Router.push(
      {
        pathname: '/search',
        query: { keyword: keyword }
      },
      `/search/${keyword}`
    )
  }

  return (
    <>
      <SearchingFormContainer onSubmit={onSubmitKeyword}>
        <input name="keyword" value={keyword} onChange={onChangeKeyword} />
        <button type="submit">검색</button>
      </SearchingFormContainer>
    </>
  )
}

export default SearchingForm
//
