import { put } from 'redux-saga/effects'
import {
  setProfile,
  getProfileSuccess,
  getProfileFailure,
} from '../store/reducers/profileSlice'

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

export const resetPasswordFlow = ({ history }) => {
  history.push('/signin')
}

export const getProfileFlow = ({ data }) => {
  return put(getProfileSuccess(data))
}

export const getFailProfileFlow = ({ data, history }) => {
  history.push('/signin')
  return put(getProfileFailure(data))
}
