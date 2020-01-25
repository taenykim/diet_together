import React, { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_POST_REQUEST } from '../reducers/post'

const PostForm = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const { imagePaths, postAdded } = useSelector(state => state.post)

  useEffect(() => {
    if (postAdded) {
      setText('')
    }
  }, [postAdded])

  const onSubmit = useCallback(
    e => {
      e.preventDefault()
      dispatch({
        type: ADD_POST_REQUEST,
        data: {
          content: text
        }
      })
    },
    [text]
  )

  const onChangeText = useCallback(e => {
    setText(e.target.value)
  }, [])

  return (
    <>
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        <input placeholder="글을 작성해주세요." value={text} onChange={onChangeText} />
        <div>
          <input type="file" multiple hidden />
          <button>이미지 업로드</button>
          <button type="submit">작성</button>
        </div>
        <div>
          {imagePaths.map((v, i) => {
            return (
              <div key={v} style={{ display: 'inline-block' }}>
                <img src={'http://localhost:3065/' + v} style={{ width: '200px' }} alt={v} />
                <div>
                  <button>제거</button>
                </div>
              </div>
            )
          })}
        </div>
      </form>
    </>
  )
}

export default PostForm
