import { all, takeEvery, call, put } from 'redux-saga/effects'
import Cookie from 'js-cookie'
import * as R from 'ramda'
import { createBrowserHistory } from 'history'
import { authRequest, authSuccess, authFailure } from '../reducers/authSlice'
import { setProfile } from '../reducers/profileSlice'
import { postAxios } from '../../utils/api'

const path = {
  signin: '/auth/checkAuth',
  signup: '/auth/checkAuth',
  signout: '/auth/checkAuth',
  signinGoogle: '/auth/authenticate_openid',
}
const history = createBrowserHistory()

function* authIn({ payload }) {
  try {
    const callApiF = R.cond([
      [R.equals('signin'), () => call(postAxios, path.signin, payload.data)],
      [
        R.equals('signinGoogle'),
        () => call(postAxios, path.signinGoogle, payload.data),
      ],
      [R.T, () => null],
    ])
    // const { data, type } = yield call(postAxios, path, payload.data)
    const {
      data: { data, type },
    } = yield callApiF(payload.type)

    if (type) {
      yield put(authSuccess())

      const flowControlF = R.cond([
        [
          R.equals('signin'),
          () => {
            history.replace('/test')
            return put(setProfile(data))
          },
        ],
        [
          R.equals('signinGoogle'),
          () => {
            window.location.href = data
          },
        ],
        [R.T, () => null],
      ])

      yield flowControlF(payload.type)
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
