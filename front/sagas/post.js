import { all, call, fork, put, takeLatest } from 'redux-saga/effects'
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS
} from '../reducers/post'
import axios from 'axios'

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
    const result = yield call(addPostAPI, action.data)
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    })
  } catch (e) {
    console.log(e)
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
function loadMainPostsAPI() {
  return axios.get('/posts')
}

function* loadMainPosts() {
  try {
    const result = yield call(loadMainPostsAPI)
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
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts)
}

/**
 * 댓글 작성 *
 * server :
 * front :
 */
function addCommentAPI() {}

function* addComment(action) {
  try {
    // yield call(addCommentAPI)
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId
      }
    })
  } catch (e) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e
    })
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* postSaga() {
  yield all([fork(watchLoadMainPosts), fork(watchAddPost), fork(watchAddComment)])
}
