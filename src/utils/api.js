import axios from 'axios'
import Cookie from 'js-cookie'

const URL = 'http://127.0.0.1:3000/api/v1'

export const postAxios = (path, params) => {
  console.log('params', params)
  return axios.post(URL + path, params, { withCredentials: true })
}

export const getAxios = (path, params) => {
  return axios.get(path, params)
}
