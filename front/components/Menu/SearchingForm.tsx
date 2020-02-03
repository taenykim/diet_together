import * as React from 'react'
import { useState, useCallback } from 'react'
import Router from 'next/router'
import styled from 'styled-components'

const SearchingFormContainer = styled.form`
  display: flex;
  margin-right: 20px;
  input {
    font-family: escore5;
    border-radius: 10px;
    width: 200px;
    border-width: 0px;
    font-size: 12px;
    box-shadow: 2px 2px 10px #888;
    padding-left: 10px;
  }
  button {
    font-family: escore5;
    border-radius: 9px;
    margin-left: 12px;
    background: rgb(94, 94, 94);
    color: white;
    border-width: 0px;
    box-shadow: 2px 2px 2px #444;
  }
  button:focus {
    outline: none;
  }
  button:active {
    box-shadow: inset 2px 2px 2px #888;
  }
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
