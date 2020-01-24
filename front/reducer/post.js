export const initialState = {
  imagePaths: [],
  mainPosts: [
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
}

export const ADD_POST = 'ADD_POST'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default reducer
