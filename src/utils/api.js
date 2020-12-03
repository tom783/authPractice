import axios from 'axios'
import Cookie from 'js-cookie'
import { call } from 'redux-saga/effects'

const URL = 'http://127.0.0.1:3000/api/v1'
const PATH = {
  signin: '/auth/checkAuth',
  signup: '/auth/checkAuth',
  signout: '/auth/checkAuth',
  signinGoogle: '/auth/authenticate_openid',
}

export const postAxios = (path, params) => {
  console.log('params', params)
  return axios.post(URL + path, params, { withCredentials: true })
}

export const getAxios = (path, params) => {
  return axios.get(path, params)
}

export const signinApi = (data) => {
  const params = data
  return call(postAxios, PATH.signin, params)
}

export const signinGoogleApi = (data) => {
  const params = data
  return call(postAxios, PATH.signinGoogle, params)
}
