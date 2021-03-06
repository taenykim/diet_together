import { all, call, fork, takeEvery, put, takeLatest } from 'redux-saga/effects'
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
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
  EDIT_NICKNAME_SUCCESS,
  WEIGHT_POST_FAILURE,
  WEIGHT_POST_REQUEST,
  WEIGHT_POST_SUCCESS,
  WEIGHT_DELETE_FAILURE,
  WEIGHT_DELETE_SUCCESS,
  WEIGHT_DELETE_REQUEST
} from '../reducers/user'
import axios from 'axios'

// 로그인 // LOG_IN_REQUEST // api/user/login
function logInAPI(logInData) {
  return axios.post('/user/login', logInData, {
    withCredentials: true
  })
}
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data)
    // console.log(result)
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOG_IN_FAILURE,
      reason: e.response && e.response.data
    })
  }
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn)
}

// 회원가입 // SIGN_UP_REQUEST // api/user
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
      reason: e.response && e.response.data
    })
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp)
}

// 몸무게 추가 // WEIGHT_POST_REQUEUST // api/user/weight
function weightPostAPI(weight) {
  return axios.post('/user/weight', { weight }, { withCredentials: true })
}

function* weightPost(action) {
  try {
    const result = yield call(weightPostAPI, action.data)
    yield put({
      type: WEIGHT_POST_SUCCESS,
      data: result.data
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: WEIGHT_POST_FAILURE,
      error: e
    })
  }
}

function* watchWeightPost() {
  yield takeEvery(WEIGHT_POST_REQUEST, weightPost)
}

// 로그아웃 // LOG_OUT_REQUEST // api/user/logout
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

// 회원정보 불러오기 // LOAD_USER_REQUEST // api/user/:id
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
      me: !action.data // 내 정보일 시 데이터가 없으므로 true, 남의 정보일 시 id 정보가 있으므로 false
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

// 팔로우 // FOLLOW_USER_REQUEST // api/user/:id/follow
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

// 언팔로우 // UNFOLLOW_USER_REQUEST // api/user/:id/follow
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

function loadFollowersAPI(userId, offset = 0, limit = 3) {
  return axios.get(`/user/${userId || 0}/followers?offset=${offset}&limit=${limit}`, {
    withCredentials: true
  })
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data, action.offset)
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

function loadFollowingsAPI(userId, offset = 0, limit = 3) {
  return axios.get(`/user/${userId || 0}/followings?offset=${offset}&limit=${limit}`, {
    withCredentials: true
  })
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data, action.offset)
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

// 팔로워 삭제 // REMOVE_FOLLOWER_REQUEST // api/user/:id/follower
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

// 닉네임 수정 // EDIT_NICKNAME_REQUSET // api/user/nickname
function editNicknameAPI(nickname) {
  // console.log('nicknameinfo', nickname)
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

// 몸무게 삭제 // WEIGHT_DELETE_REQUEST // api/user/wieght/:id
function weightDeleteAPI(index) {
  return axios.delete(`/user/weight/${index}`, { withCredentials: true })
}

function* weightDelete(action) {
  try {
    const result = yield call(weightDeleteAPI, action.data)
    yield put({
      type: WEIGHT_DELETE_SUCCESS,
      data: result.data
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: WEIGHT_DELETE_FAILURE,
      error: e
    })
  }
}

function* watchWeightDelete() {
  yield takeLatest(WEIGHT_DELETE_REQUEST, weightDelete)
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
    fork(watchEditNickname),
    fork(watchWeightPost),
    fork(watchWeightDelete)
  ])
}
// 그거 팔로잉 팔로워 목록 offset 문제만남음
//
