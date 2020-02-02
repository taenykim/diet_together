import * as React from 'react'
import { useEffect, useCallback, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../../reducers/post'
import styled from 'styled-components'
import { RootState } from '../../reducers'
import { backUrl } from '../../config/config'

const PostFormContainer = styled.form`
  box-shadow: 9px 9px 16px rgba(163, 177, 198, 0.6), -9px -9px 16px rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 20px;
  margin-top: 10px;
  padding: 15px;
`

const PostInput = styled.input`
  width: 100%;
  border-radius: 5px;
  height: 30px;
  margin-bottom: 10px;
`
const PostForm = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const { imagePaths, postAdded } = useSelector((state: RootState) => state.post)
  const imageInput = useRef<HTMLInputElement>()

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
      // console.log('formdatainfo', formData)
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
        <PostInput
          type="textarea"
          placeholder="글을 작성해주세요."
          value={text}
          onChange={onChangeText}
        />
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
                <img src={`${backUrl}/${v}`} style={{ width: '200px' }} alt={v} />
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
//
