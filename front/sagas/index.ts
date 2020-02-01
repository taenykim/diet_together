import { all, fork } from 'redux-saga/effects'
import user from './user'
import post from './post'
import axios from 'axios'
import { backUrl } from '../config/config'

axios.defaults.baseURL = `${backUrl}/api`

export default function* rootSaga() {
  yield all([fork(user), fork(post)])
}
//
