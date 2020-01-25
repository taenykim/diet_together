import { all, call, fork, takeLatest, put } from 'redux-saga/effects'
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS
} from '../reducers/user'
import axios from 'axios'

function loginAPI(loginData) {
  return axios.post('/login', loginData)
}

function* login(action) {
  try {
    yield call(loginAPI, action.data)
    yield put({
      type: LOG_IN_SUCCESS
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: LOG_IN_FAILURE
    })
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login)
}

function SignUpAPI(signUpData) {
  return axios.post('http://localhost:3065/api/user/', signUpData)
}

function* signUp(action) {
  try {
    yield call(SignUpAPI, action.data)
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

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchSignUp)])
}
