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
  LOAD_USER_SUCCESS
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

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchSignUp), fork(watchLogOut), fork(watchLoadUser)])
}
