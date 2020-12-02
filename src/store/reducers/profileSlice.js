import { createSlice } from '@reduxjs/toolkit'
import produce from 'immer'
import { authOut, setInit } from './authSlice'

export const initState = {
  isFetching: false,
  error: [],
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
    getProfilePending: (state, action) => {
      state.isFetching = true
      state.error = []
    },
    getProfileSuccess: (state, action) => {
      const data = action.payload

      state.isFetching = false
      state.originalProfile = data
    },
    getProfileFailure: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    },
    setProfile: (state, action) => {
      const data = action.payload

      state.error = []
      state.originalProfile = data
    },
  },
  extraReducers: {
    [authOut]: (state, action) => {
      state.state = action.type
      state.error = []
      state.originalProfile = initState.originalProfile
    },
    [setInit]: (state, action) => {
      state = initState
    },
  },
})

export const {
  getProfilePending,
  getProfileSuccess,
  getProfileFailure,
  setProfile,
} = profileSlice.actions
export default profileSlice.reducer
