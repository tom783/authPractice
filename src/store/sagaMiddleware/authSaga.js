import { all, takeEvery, call, put } from 'redux-saga/effects'
import * as R from 'ramda'
import { authRequest, authSuccess, authFailure } from '../reducers/authSlice'
import { setProfile } from '../reducers/profileSlice'

function* authIn({ payload }) {
  const { apiCall, sagaFlow, history } = payload

  try {
    const {
      data: { data, type },
    } = yield apiCall()

    if (type) {
      yield put(authSuccess())
      yield sagaFlow({ data, history })
    } else {
      yield put(authFailure(data))
    }
  } catch (err) {
    yield put(authFailure(err))
  }
}

function* signup({ payload }) {
  const { data } = yield call()
}

export default function* authSaga() {
  yield all([takeEvery(authRequest, authIn)])
}
