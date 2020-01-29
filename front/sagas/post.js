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
  LOAD_POST_SUCCESS
} from '../reducers/post'
import axios from 'axios'

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user'

/**
 * 게시글 작성 *
 * server : /api/post/ (POST)
 * front : ADD_POST_REQUEST
 */
function addPostAPI(postData) {
  return axios.post('/post/', postData, {
    withCredentials: true
  })
}

function* addPost(action) {
  try {
    console.log(action.data)
    const result = yield call(addPostAPI, action.data)
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

/**
 * 게시글 불러오기(HOME) *
 * server : /api/posts/ (GET)
 * front : LOAD_MAIN_POSTS_REQUEST
 */
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

/**
 * 남의 정보 게시글 불러오기
 *
 */
function loadUserPostsAPI(id) {
  return axios.get(`/user/${id || 0}/posts`)
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data)
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

/**
 * 댓글 작성 *
 * server :
 * front :
 */
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
    fork(watchLoadPost)
  ])
}
