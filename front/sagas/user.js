import { all, call, fork, takeLatest, put } from 'redux-saga/effects'
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducer/user'

function loginAPI() {}

function* login() {
  try {
    yield call(loginAPI)
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

export default function* userSaga() {
  yield all([fork(watchLogin)])
}
