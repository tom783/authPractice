import { createSlice } from '@reduxjs/toolkit'
import { authOut, setInit } from './authSlice'

export const initState = {
  originalProfile: {
    id: null,
    fullName: null,
    username: null,
    email: null,
    confirmed: null,
    memberType: null,
    signinType: null,
    avatarSource: null,
    initials: null,
    gravatarHash: null,
  },
}

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState: initState,
  reducers: {
    getProfileSuccess: (state, action) => {
      const data = action.payload
      state.originalProfile = data
    },
    setProfile: (state, action) => {
      const data = action.payload
      state.originalProfile = data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authOut, (state, action) => {
        state = initState
      })
      .addCase(setInit, (state, action) => {
        state = initState
      })
  },
})

export const { getProfileSuccess, setProfile } = profileSlice.actions
export default profileSlice.reducer
