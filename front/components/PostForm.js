import React, { useEffect, useCallback, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post'
import styled from 'styled-components'

const PostFormContainer = styled.form`
  border: 1px solid black;
`
const PostForm = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const { imagePaths, postAdded } = useSelector(state => state.post)
  const imageInput = useRef()

  useEffect(() => {
    if (postAdded) {
      setText('')
    }
  }, [postAdded])

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault()
      if (!text || !text.trim()) {
        return alert('게시글을 작성하세요.')
      }
      const formData = new FormData()
      imagePaths.forEach(i => {
        formData.append('image', i)
      })
      formData.append('content', text)
      dispatch({
        type: ADD_POST_REQUEST,
        data: formData
      })
    },
    [text, imagePaths]
  )

  const onChangeText = useCallback(e => {
    setText(e.target.value)
  }, [])

  const onChangeImages = useCallback(e => {
    const imageFormData = new FormData()
    ;[].forEach.call(e.target.files, f => {
      imageFormData.append('image', f)
    })
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData
    })
  }, [])

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current])

  const onRemoveImage = useCallback(
    index => () => {
      dispatch({
        type: REMOVE_IMAGE,
        index
      })
    },
    []
  )

  return (
    <>
      <PostFormContainer encType="multipart/form-data" onSubmit={onSubmitForm}>
        <input placeholder="글을 작성해주세요." value={text} onChange={onChangeText} />
        <div>
          <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
          <button type="button" onClick={onClickImageUpload}>
            이미지 업로드
          </button>
          <button type="submit">작성</button>
        </div>
        <div>
          {imagePaths.map((v, i) => {
            return (
              <div key={v} style={{ display: 'inline-block' }}>
                <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
                <div>
                  <button type="button" onClick={onRemoveImage(i)}>
                    제거
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </PostFormContainer>
    </>
  )
}

export default PostForm
