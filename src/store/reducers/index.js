import { combineReducers } from 'redux'
import auth from './authSlice'
import profile from './profileSlice'

export default combineReducers({ auth, profile })
