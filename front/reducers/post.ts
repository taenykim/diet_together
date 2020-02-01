import produce from 'immer'

export const initialState = {
  mainPosts: [],
  imagePaths: [], // 이미지 미리보기 경로

  postAdded: false,
  commentAdded: false,

  singlePost: null,
  hasMorePost: false
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

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST'
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS'
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE'

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      // 이미지 미리보기 업로드 // UPLOAD_IMAGES_REQUEST // api/post/images
      case UPLOAD_IMAGES_REQUEST: {
        break
      }
      case UPLOAD_IMAGES_SUCCESS: {
        action.data.forEach(p => {
          draft.imagePaths.push(p)
        })
        break
      }
      case UPLOAD_IMAGES_FAILURE: {
        break
      }
      // 미리보기 이미지 삭제 // REMOVE_IMAGE // 사가없음
      case REMOVE_IMAGE: {
        const index = draft.imagePaths.findIndex((v, i) => i === action.index)
        draft.imagePaths.splice(index, 1)
        break
      }
      // 게시물 작성 // ADD_POST_REQUSET // api/post/
      case ADD_POST_REQUEST: {
        draft.postAdded = false
        break
      }
      case ADD_POST_SUCCESS: {
        draft.mainPosts.unshift(action.data)
        draft.postAdded = true
        draft.imagePaths = []
        break
      }
      case ADD_POST_FAILURE: {
        break
      }
      // 댓글 작성 // ADD_COMMENT_REQUEST // api/post/:id/comment
      case ADD_COMMENT_REQUEST: {
        draft.commentAdded = false
        break
      }
      case ADD_COMMENT_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId)
        draft.mainPosts[postIndex].Comments.push(action.data.comment)
        draft.commentAdded = true
        break
      }
      case ADD_COMMENT_FAILURE: {
        break
      }
      // 댓글 불러오기 // ADD_COMMENT_REQUEST // api/post/:id/comments
      case LOAD_COMMENTS_REQUEST: {
        break
      }
      case LOAD_COMMENTS_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId)
        draft.mainPosts[postIndex].Comments = action.data.comments
        break
      }
      case LOAD_COMMENTS_FAILURE: {
        break
      }
      // 모든 게시글 불러오기 // LOAD_MAIN_POSTS_REQUEST // api/posts?lastID=''&limit=''
      // 남의 게시글 불러오기 // LOAD_USER_POSTS_REQUEST // api/posts/user/:id
      case LOAD_MAIN_POSTS_REQUEST:
      case LOAD_USER_POSTS_REQUEST: {
        draft.mainPosts = !action.lastId ? [] : draft.mainPosts
        draft.hasMorePost = action.lastId ? draft.hasMorePost : true
        break
      }
      case LOAD_MAIN_POSTS_SUCCESS:
      case LOAD_USER_POSTS_SUCCESS: {
        action.data.forEach(d => {
          draft.mainPosts.push(d)
        })
        draft.hasMorePost = action.data.length === 10

        break
      }
      case LOAD_MAIN_POSTS_FAILURE:
      case LOAD_USER_POSTS_FAILURE: {
        break
      }
      // 게시글 좋아요 // LIKE_POST_REQUEST // api/post/:id/like
      case LIKE_POST_REQUEST: {
        break
      }
      case LIKE_POST_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId)
        draft.mainPosts[postIndex].Likers.unshift({ id: action.data.userId })
        break
      }
      case LIKE_POST_FAILURE: {
        break
      }
      // 게시글 좋아요 취소 // UNLIKE_POST_REQUEST // api/post/:id/like
      case UNLIKE_POST_REQUEST: {
        break
      }
      case UNLIKE_POST_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId)
        const likeIndex = draft.mainPosts[postIndex].Likers.findIndex(
          v => v.id === action.data.userId
        )
        draft.mainPosts[postIndex].Likers.splice(likeIndex, 1)
        break
      }
      case UNLIKE_POST_FAILURE: {
        break
      }
      // 게시글 삭제 // REMOVE_POST_REQUEST // api/post/:id
      case REMOVE_POST_REQUEST: {
        break
      }
      case REMOVE_POST_SUCCESS: {
        const index = draft.mainPosts.findIndex(v => v.id === action.data)
        draft.mainPosts.splice(index, 1)
        break
      }
      case REMOVE_POST_FAILURE: {
        break
      }
      // 싱글 게시글 정보 불러오기 // LOAD_POST_REQUEST // api/post/:id
      case LOAD_POST_REQUEST: {
        break
      }
      case LOAD_POST_SUCCESS: {
        draft.singlePost = action.data
        break
      }
      case LOAD_POST_FAILURE: {
        break
      }
      default: {
        break
      }
    }
  })
}
//
