export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '김태은'
      },
      img:
        'https://images.velog.io/images/kimtaeeeny/profile/17991380-0b3d-11ea-a24a-5f4ee8031413/KakaoTalk20191120112528625.jpg',
      content: '게시글!',
      Comments: []
    },
    {
      id: 2,
      User: {
        id: 2,
        nickname: '우왕왕'
      },
      img:
        'https://images.velog.io/images/kimtaeeeny/profile/17991380-0b3d-11ea-a24a-5f4ee8031413/KakaoTalk20191120112528625.jpg',
      content: '게시글2!',
      Comments: []
    }
  ],
  imagePaths: [], // 이미지 미리보기 경로
  addPostErrorReason: '', // 포스트 업로드 실패 사유
  postAdded: false, // 포스트 업로드 성공
  addCommentErrorReason: '',
  commentAdded: false
}

const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: '김태은더미'
  },
  content: '더미콘텐츠.',
  Comments: []
}

const dummyComment = {
  id: 1,
  User: {
    id: 1,
    nickname: '김태은댓글더미'
  },
  content: '더미콘텐츠'
}

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST'
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS'
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE'

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST'
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS'
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE'

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST'
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS'
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE'

export const REMOVE_IMAGE = 'REMOVE_IMAGE'

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST'
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS'
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE'

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST'
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS'
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST'
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS'
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE'

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST: {
      return {
        ...state,
        addPostErrorReason: '',
        postAdded: false
      }
    }
    case ADD_POST_SUCCESS: {
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true
      }
    }
    case ADD_POST_FAILURE: {
      return {
        ...state,
        addPostErrorReason: action.error
      }
    }
    case ADD_COMMENT_REQUEST: {
      return {
        ...state,
        addCommentErrorReason: '',
        commentAdded: false
      }
    }
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId)
      const post = state.mainPosts[postIndex]
      const Comments = [...post.Comments, dummyComment]
      const mainPosts = [...state.mainPosts]
      mainPosts[postIndex] = { ...post, Comments }
      return {
        ...state,
        mainPosts,
        commentAdded: true
      }
    }
    case ADD_COMMENT_FAILURE: {
      return {
        ...state,
        addCommentErrorReason: action.error
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