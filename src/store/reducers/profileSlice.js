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
      produce(state, (draft) => {
        draft.isFetching = true
        draft.error = []
      })
    },
    getProfileSuccess: (state, action) => {
      const data = action.payload
      produce(state, (draft) => {
        draft.isFetching = false
        draft.originalProfile = data
      })
    },
    getProfileFailure: (state, action) => {
      produce(state, (draft) => {
        draft.isFetching = false
        draft.error = action.payload
      })
    },
    setProfile: (state, action) => {
      const data = action.payload
      produce(state, (draft) => {
        draft.error = []
        draft.originalProfile = data
      })
    },
  },
  extraReducers: {
    [authOut]: (state, action) => {
      produce(state, (draft) => {
        draft.state = action.type
        draft.error = []
        draft.originalProfile = initState.originalProfile
      })
    },
    [setInit]: (state, action) => {
      produce(state, (draft) => {
        draft = initState
      })
    },
  },
})

export const {
  getProfilePending,
  getProfileSuccess,
  getProfileFailure,
} = profileSlice.actions
export default profileSlice.reducer
