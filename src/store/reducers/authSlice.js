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
      produce(state, (draft) => {
        draft.isFetching = true
        draft.error = []
        draft.isValid = false
      })
    },
    authSuccess: (state, action) => {
      produce(state, (draft) => {
        draft.isFetching = false
        draft.isValid = false
      })
    },
    authFailure: (state, action) => {
      produce(state, (draft) => {
        draft.isFetching = false
        draft.error = action.payload
      })
    },
    errorCatch: (state, action) => {
      produce(state, (draft) => {
        draft.isFetching = false
        draft.error = action.payload
      })
    },
    authOut: (state, action) => {
      produce(state, (draft) => {
        draft.state = action.type
        draft.error = []
        draft.fields = initState.fields
      })
    },
    setInit: (state, action) => {
      produce(state, (draft) => {
        draft = initState
      })
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
