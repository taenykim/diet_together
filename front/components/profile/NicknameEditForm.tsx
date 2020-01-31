import * as React from 'react'
import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EDIT_NICKNAME_REQUEST } from '../../reducers/user'
import styled from 'styled-components'
import { RootState } from '../../reducers'

const NicknameEditFormContainer = styled.form`
  border: 1px solid black;
`
const NicknameEditForm = () => {
  const [editedName, setEditedName] = useState('')
  const dispatch = useDispatch()
  const { me } = useSelector((state: RootState) => state.user)

  const onChangeNickname = useCallback(e => {
    setEditedName(e.target.value)
  }, [])

  const onEditNickname = useCallback(
    e => {
      e.preventDefault()
      dispatch({
        type: EDIT_NICKNAME_REQUEST,
        data: editedName
      })
    },
    [editedName]
  )

  return (
    <>
      <NicknameEditFormContainer onSubmit={onEditNickname}>
        <label htmlFor="nickname">닉네임</label>
        <input
          name="nickname"
          value={editedName || (me && me.nickname)}
          onChange={onChangeNickname}
        />
        <button type="submit">수정</button>
      </NicknameEditFormContainer>
    </>
  )
}

export default NicknameEditForm
//
