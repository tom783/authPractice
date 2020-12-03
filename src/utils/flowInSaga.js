import { put } from 'redux-saga/effects'
import { setProfile } from '../store/reducers/profileSlice'

export const signinFlow = ({ data, history }) => {
  history.push('/test')
  return put(setProfile(data))
}

export const signinGoogleFlow = ({ data }) => {
  const url = data
  window.location.href = url
}

export const signupFlow = ({ data, history }) => {
  history.push('/signin')
  return put(setProfile(data))
}

export const signupGoogleFlow = ({ data }) => {
  const url = data
  window.location.href = url
}
