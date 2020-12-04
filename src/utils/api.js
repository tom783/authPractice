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
  return axios.post(URL + path, params, { withCredentials: true })
}

export const getAxios = (path, params) => {
  const token = Cookie.get('token')
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return params
    ? axios.get(URL + path, params, { headers, withCredentials: true })
    : axios.get(URL + path, { headers, withCredentials: true })
}

export const signinApi = (data) => {
  const params = data
  return call(postAxios, PATH.signin, params)
}

export const signinGoogleApi = (data) => {
  const params = data
  return call(postAxios, PATH.signinGoogle, params)
}

export const signupApi = (data) => {
  const params = data
  return call(postAxios, PATH.signup, params)
}

export const signupGoogleApi = (data) => {
  const params = data
  return call(postAxios, PATH.signupGoogle, params)
}

export const sendResetEmail = (data) => {
  const params = data
  return call(postAxios, PATH.sendResetEmail, params)
}

export const checkResetPasswordToken = (data) => {
  const params = data
  return call(getAxios, `${PATH.checkResetPasswordToken}/${params}`)
}

export const resetPassword = (data) => {
  const params = data
  return call(postAxios, PATH.resetPassword, params)
}

export const getProfile = (data) => {
  const params = data
  return call(getAxios, PATH.getProfile)
}
