import { createSlice } from '@reduxjs/toolkit'

export const initState = {
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
    authRequest: (state, action) => {},
    authOut: (state, action) => {
      state = initState
    },
    setInit: (state, action) => {
      state = initState
    },
  },
})

export const { authRequest, authOut, setInit } = authSlice.actions
export default authSlice.reducer
