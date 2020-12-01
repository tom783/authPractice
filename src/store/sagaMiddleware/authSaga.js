import { all, takeEvery, call } from 'redux-saga/effects'
import { authRequest } from '../reducers/authSlice'
import { postAxios } from '../../utils/api'

const path = '/auth/checkAuth'

function* auth({ payload }) {
  console.log('saga', payload)
  const { data } = yield call(postAxios, path, payload)
}

export default function* authSaga() {
  yield all([takeEvery(authRequest, auth)])
}
