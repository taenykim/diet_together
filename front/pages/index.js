import React from 'react'

const loggedIn = true
const imagePaths = []
const mainPosts = [
  {
    createAt: 1,
    User: {
      id: 1,
      nickname: '김태은'
    },
    img:
      'https://images.velog.io/images/kimtaeeeny/profile/17991380-0b3d-11ea-a24a-5f4ee8031413/KakaoTalk20191120112528625.jpg',
    content: '게시글!'
  },
  {
    createAt: 2,
    User: {
      id: 2,
      nickname: '우왕왕'
    },
    img:
      'https://images.velog.io/images/kimtaeeeny/profile/17991380-0b3d-11ea-a24a-5f4ee8031413/KakaoTalk20191120112528625.jpg',
    content: '게시글2!'
  }
]

const index = () => {
  return (
    <>
      {loggedIn && (
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
      )}
      {mainPosts.map((c, i) => {
        return (
          <div key={+c.createAt}>
            <div>{c.img && <img style={{ width: '20px' }} src={c.img}></img>}</div>
            <div> {c.User.nickname}</div>
            <div>{c.content}</div>
            <br />
          </div>
        )
      })}
    </>
  )
}

export default index
