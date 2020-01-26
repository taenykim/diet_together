import { all, call, fork, takeLatest, takeEvery, put } from 'redux-saga/effects'
import {
  // 로그인
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  // 회원가입
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  // 로그아웃
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  // 회원정보 불러오기
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_REQUEST,
  EDIT_NICKNAME_FAILURE,
  EDIT_NICKNAME_REQUEST,
  EDIT_NICKNAME_SUCCESS
} from '../reducers/user'
import axios from 'axios'

/**
 * 로그인 *
 * server : /api/user/logout (POST)
 * front : LOG_IN_REQUEST
 */
function logInAPI(logInData) {
  return axios.post('/user/login', logInData, {
    withCredentials: true
  })
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data)
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOG_IN_FAILURE
    })
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn)
}

/**
 * 회원가입 *
 * server : /api/user/ (POST)
 * front : SIGN_UP_REQUEST
 */
function signUpAPI(signUpData) {
  return axios.post('/user/', signUpData)
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data)
    yield put({
      type: SIGN_UP_SUCCESS
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: SIGN_UP_FAILURE,
      error: e
    })
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}

/**
 * 로그아웃 *
 * server : /api/user/logout (POST)
 * front : LOG_OUT_REQUEST
 */
function logOutAPI() {
  return axios.post(
    '/user/logout',
    {},
    {
      withCredentials: true
    }
  )
}

function* logOut() {
  try {
    yield call(logOutAPI)
    yield put({
      type: LOG_OUT_SUCCESS
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOG_OUT_FAILURE,
      error: e
    })
  }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}

/**
 * 회원정보 불러오기 (userId / x) *
 * server : /api/user/ (GET)
 * front : LOG_OUT_REQUEST
 */
function loadUserAPI(userId) {
  return axios.get(userId ? `/user/${userId}` : '/user/', {
    withCredentials: true
  })
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data)
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOAD_USER_FAILURE,
      error: e
    })
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser)
}

function followAPI(userId) {
  return axios.post(
    `/user/${userId}/follow`,
    {},
    {
      withCredentials: true
    }
  )
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data)
    yield put({
      type: FOLLOW_USER_SUCCESS,
      data: result.data
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: FOLLOW_USER_FAILURE,
      error: e
    })
  }
}

function* watchFollow() {
  yield takeEvery(FOLLOW_USER_REQUEST, follow)
}

function unfollowAPI(userId) {
  return axios.delete(`/user/${userId}/follow`, {
    withCredentials: true
  })
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data)
    yield put({
      type: UNFOLLOW_USER_SUCCESS,
      data: result.data
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: UNFOLLOW_USER_FAILURE,
      error: e
    })
  }
}

function* watchUnfollow() {
  yield takeEvery(UNFOLLOW_USER_REQUEST, unfollow)
}

function loadFollowersAPI(userId) {
  return axios.get(`/user/${userId}/followers`, {
    withCredentials: true
  })
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data)
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: e
    })
  }
}

function* watchLoadFollowers() {
  yield takeEvery(LOAD_FOLLOWERS_REQUEST, loadFollowers)
}

function loadFollowingsAPI(userId) {
  return axios.get(`/user/${userId}/followings`, {
    withCredentials: true
  })
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data)
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: e
    })
  }
}

function* watchLoadFollowings() {
  yield takeEvery(LOAD_FOLLOWINGS_REQUEST, loadFollowings)
}

function removeFollowerAPI(userId) {
  return axios.delete(`/user/${userId}/follower`, {
    withCredentials: true
  })
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data)
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: e
    })
  }
}

function* watchRemoveFollower() {
  yield takeEvery(REMOVE_FOLLOWER_REQUEST, removeFollower)
}

function editNicknameAPI(nickname) {
  return axios.patch(
    '/user/nickname',
    { nickname },
    {
      withCredentials: true
    }
  )
}

function* editNickname(action) {
  try {
    const result = yield call(editNicknameAPI, action.data)
    yield put({
      type: EDIT_NICKNAME_SUCCESS,
      data: result.data
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: EDIT_NICKNAME_FAILURE,
      error: e
    })
  }
}

function* watchEditNickname() {
  yield takeEvery(EDIT_NICKNAME_REQUEST, editNickname)
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchSignUp),
    fork(watchLogOut),
    fork(watchLoadUser),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollower),
    fork(watchEditNickname)
  ])
}
