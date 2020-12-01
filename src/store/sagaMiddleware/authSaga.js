import { all, takeEvery, call } from 'redux-saga/effects'
import { authRequest } from '../reducers/authSlice'
import { postAxios } from '../../utils/api'

const path = {
  signin: '/auth/checkAuth',
  signup: '/auth/checkAuth',
  signout: '/auth/checkAuth',
}

function* signin({ payload }) {
  console.log('saga signin', payload)
  const { data } = yield call(postAxios, path, payload)
}

function* signup({ payload }) {
  console.log('saga signup', payload)
  const { data } = yield call()
}

export default function* authSaga() {
  yield all([takeEvery(authRequest, signin)])
}
