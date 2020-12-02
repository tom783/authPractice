import { createSlice } from '@reduxjs/toolkit'
import produce from 'immer'

export const initState = {
  state: null,
  disabled: false,
  error: [],
  isValid: false,
  isFetching: false,
  fields: {
    fullName: '',
    fullNameHasError: false,
    email: '',
    emailHasError: false,
    password: '',
    passwordHasError: false,
    passwordAgain: '',
    passwordAgainHasError: false,
  },
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState: initState,
  reducers: {
    authRequest: (state, action) => {
      state.isFetching = true
      state.error = []
      state.isValid = false
    },
    authSuccess: (state, action) => {
      state.isFetching = false
      state.isValid = true
    },
    authFailure: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    },
    errorCatch: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    },
    authOut: (state, action) => {
      state.state = action.type
      state.error = []
      state.fields = initState.fields
    },
    setInit: (state, action) => {
      state = initState
    },
  },
})

export const {
  authRequest,
  authSuccess,
  authFailure,
  errorCatch,
  authOut,
  setInit,
} = authSlice.actions
export default authSlice.reducer
