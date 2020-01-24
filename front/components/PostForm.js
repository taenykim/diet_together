import React from 'react'
import { useSelector } from 'react-redux'

const PostForm = () => {
  const imagePaths = useSelector(state => state.post.imagePaths)
  return (
    <>
      <form encType="multipart/form-data">
        <input placeholder="글을 작성해주세요." />
        <div>
          <input type="file" multiple hidden />
          <button>이미지 업로드</button>
          <button>작성</button>
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
