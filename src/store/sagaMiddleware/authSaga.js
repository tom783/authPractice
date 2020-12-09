import { all, takeEvery, call, put } from 'redux-saga/effects'
import * as R from 'ramda'
import { authRequest } from '../reducers/authSlice'

function* authIn({ payload }) {
  const { resData, sagaFlow, failSagaFlow, history } = payload
  const { data, type } = resData

  if (type) {
    yield sagaFlow && sagaFlow({ data, history })
  } else {
    yield failSagaFlow && failSagaFlow({ data, history })
  }
}

export default function* authSaga() {
  yield all([takeEvery(authRequest, authIn)])
}
