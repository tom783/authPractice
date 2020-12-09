import axios from 'axios'
import Cookie from 'js-cookie'
import { call } from 'redux-saga/effects'

const URL = 'http://127.0.0.1:3000/api/v1'
const PATH = {
  signin: '/auth/checkAuth',
  signup: '/auth/authenticate',
  signout: '/auth/checkAuth',
  signinGoogle: '/auth/authenticate_openid',
  signupGoogle: '/auth/authenticate_openid',
  sendResetEmail: '/auth/resetPassword',
  checkResetPasswordToken: '/auth/verifyReset',
  resetPassword: '/auth/changePassword',
  getProfile: '/account/me',
}

export const postAxios = (path, params) => {
  console.log('params', params)
  return axios
    .post(URL + path, params, { withCredentials: true })
    .then((res) => res.data)
}

export const getAxios = (path, params) => {
  const token = Cookie.get('token')
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return params
    ? axios
        .get(URL + path, params, { headers, withCredentials: true })
        .then((res) => res.data)
    : axios
        .get(URL + path, { headers, withCredentials: true })
        .then((res) => res.data)
}

export const signinApi = async (data, setState) => {
  const params = data
  const res = await postAxios(PATH.signin, params)
  setState((draft) => {
    draft.data = res
  })
}

export const signinGoogleApi = async (data, setState) => {
  const params = data
  const res = await postAxios(PATH.signinGoogle, params)
  setState((draft) => {
    draft.data = res
  })
}

export const signupApi = async (data, setState) => {
  const params = data
  const res = await postAxios(PATH.signup, params)
  setState((draft) => {
    draft.data = res
  })
}

export const signupGoogleApi = async (data, setState) => {
  const params = data
  const res = await postAxios(PATH.signupGoogle, params)
  setState((draft) => {
    draft.data = res
  })
}

export const sendResetEmail = async (data, setState) => {
  const params = data
  const res = await postAxios(PATH.sendResetEmail, params)
  setState((draft) => {
    draft.data = res
  })
}

export const checkResetPasswordToken = async (data, setState) => {
  const params = data
  const res = await getAxios(`${PATH.checkResetPasswordToken}/${params}`)
  setState((draft) => {
    draft.data = res
    draft.checkOk = res.type ? true : false
  })
}

export const resetPassword = async (data, setState) => {
  const params = data
  const res = await postAxios(PATH.resetPassword, params)
  setState((draft) => {
    draft.data = res
  })
}

export const getProfile = async (setState) => {
  const res = await getAxios(PATH.getProfile)
  setState((draft) => {
    draft.data = res
  })
}
