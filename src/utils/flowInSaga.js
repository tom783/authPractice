import { put } from 'redux-saga/effects'
import { setProfile } from '../store/reducers/profileSlice'

export const signinFlow = ({ data, history }) => {
  history.push('/test')
  return put(setProfile(data))
}

export const signinGoogle = ({ data }) => {
  window.location.href = data
}
