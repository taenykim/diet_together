import { all, call, fork, put, takeLatest, throttle } from 'redux-saga/effects'
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_FAILURE,
  LOAD_COMMENTS_SUCCESS,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_SUCCESS,
  LIKE_POST_REQUEST,
  LIKE_POST_FAILURE,
  LIKE_POST_SUCCESS,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_LIKED_POSTS_REQUEST,
  LOAD_LIKED_POSTS_FAILURE,
  LOAD_LIKED_POSTS_SUCCESS
} from '../reducers/post'
import axios from 'axios'

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user'

// 게시글 작성 // ADD_POST_REQUEST // api/post/
function addPostAPI(postData) {
  return axios.post('/post/', postData, {
    withCredentials: true
  })
}

function* addPost(action) {
  try {
    // console.log('action.data.info', action.data)
    const result = yield call(addPostAPI, action.data)
    // console.log(result)
    // Post Reducer 의 데이터수정
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    })
    // User Reducer 의 데이터수정
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: ADD_POST_FAILURE,
      error: e
    })
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost)
}

// 모든 게시글 불러오기 // LOAD_MAIN_POSTS_REQUEST // api/posts?lastID=''&limit=''
function loadMainPostsAPI(lastId = 0, limit = 10) {
  return axios.get(`/posts?lastId=${lastId}&limit=${limit}`)
}

function* loadMainPosts(action) {
  try {
    const result = yield call(loadMainPostsAPI, action.lastId)
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data
    })
  } catch (e) {
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error: e
    })
  }
}

function* watchLoadMainPosts() {
  yield throttle(1000, LOAD_MAIN_POSTS_REQUEST, loadMainPosts)
}

// 남의 게시글 불러오기 // LOAD_USER_POSTS_REQUEST // api/posts/user/:id
function loadUserPostsAPI(id, lastId = 0, limit = 10) {
  return axios.get(`/posts/user/${id}/?lastId=${lastId}&limit=${limit}`)
}

function* loadUserPosts(action) {
  try {
    // console.log('엑션', action.data)
    const result = yield call(loadUserPostsAPI, action.data, action.lastId)
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data
    })
  } catch (e) {
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: e
    })
  }
}

function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts)
}

// 좋아요 게시글 불러오기 // LOAD_LIKED_POSTS_REQUEST // api/posts/like?lastID=''&limit=''
function loadLikedPostsAPI(lastId = 0, limit = 10) {
  return axios.get(`/posts/like?lastId=${lastId}&limit=${limit}`, {
    withCredentials: true
  })
}

function* loadLikedPosts(action) {
  try {
    const result = yield call(loadLikedPostsAPI, action.lastId)
    yield put({
      type: LOAD_LIKED_POSTS_SUCCESS,
      data: result.data
    })
  } catch (e) {
    yield put({
      type: LOAD_LIKED_POSTS_FAILURE,
      error: e
    })
  }
}

function* watchLoadLikedPosts() {
  yield throttle(1000, LOAD_LIKED_POSTS_REQUEST, loadLikedPosts)
}

// 댓글 작성 // ADD_COMMENT_REQUEST // api/post/:id/comment
function addCommentAPI(data) {
  return axios.post(
    `/post/${data.postId}/comment`,
    { content: data.content },
    {
      withCredentials: true
    }
  )
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data)
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        comment: result.data
      }
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e
    })
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

// 댓글 불러오기 // LOAD_COMMENTS_REQUEST // api/post/:id/comments
function loadCommentsAPI(postId) {
  return axios.get(`/post/${postId}/comments`)
}

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.data)
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: {
        postId: action.data,
        comments: result.data
      }
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error: e
    })
  }
}

function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments)
}
// 이미지 미리보기 업로드 // UPLOAD_IMAGES_REQUEST // api/post/images
function uploadImagesAPI(formData) {
  return axios.post('/post/images', formData, {
    withCredentials: true
  })
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data)
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: e
    })
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages)
}

// 게시글 좋아요 // LIKE_POST_REQUEST // api/post/:id/like
function likePostAPI(postId) {
  return axios.post(
    `/post/${postId}/like`,
    {},
    {
      withCredentials: true
    }
  )
}
function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data)
    yield put({
      type: LIKE_POST_SUCCESS,
      data: {
        postId: action.data,
        userId: result.data.userId
      }
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LIKE_POST_FAILURE,
      error: e
    })
  }
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost)
}
// 게시글 좋아요 취소 // UNLIKE_POST_REQUEST // api/post/:id/like
function unlikePostAPI(postId) {
  return axios.delete(`/post/${postId}/like`, {
    withCredentials: true
  })
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data)
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: {
        postId: action.data,
        userId: result.data.userId
      }
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: e
    })
  }
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost)
}

// 게시글 삭제 // REMOVE_POST_REQUEST // api/post/:id
function removePostAPI(postId) {
  return axios.delete(`/post/${postId}`, {
    withCredentials: true
  })
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data)
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data
    })
    yield put({
      type: REMOVE_POST_OF_ME,
      data: result.data
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: REMOVE_POST_FAILURE,
      error: e
    })
  }
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost)
}

// 싱글 게시글 정보 불러오기 // LOAD_POST_REQUEST // api/post/:id
function loadPostAPI(postId) {
  return axios.get(`/post/${postId}`)
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data)
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOAD_POST_FAILURE,
      error: e
    })
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost)
}

export default function* postSaga() {
  yield all([
    fork(watchLoadUserPosts),
    fork(watchLoadMainPosts),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchLoadComments),
    fork(watchUploadImages),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchRemovePost),
    fork(watchLoadPost),
    fork(watchLoadLikedPosts)
  ])
}
//
