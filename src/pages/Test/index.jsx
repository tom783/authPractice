import * as React from 'react'
import {useImmer} from 'use-immer'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { authRequest } from '../../store/reducers/authSlice'
import { getProfile } from '../../utils/api'
import {getProfileFlow, getFailProfileFlow} from '../../utils/flowInSaga'
import * as R from 'ramda'

const initState = {
  data: null
}

const initProfile = {
  id: '',
  fullName: '',
  username: '',
  email: '',
}

const Test = () => {
  const [state, setState] = useImmer(initState)
  const [profile, setProfile] = useImmer(initProfile)
  const reduxProfile = useSelector(state => state.profile.originalProfile)

  const dispatch = useDispatch()
  const history = useHistory()

  React.useEffect(() => {
    getProfile(setState)
  },[])

  React.useEffect(() => {
    if(state.data){
      dispatch(authRequest({resData: state.data, sagaFlow: getProfileFlow, failSagaFlow: getFailProfileFlow, history}))
    }
  }, [state.data])

  React.useLayoutEffect(() => {
    const profileData = R.pick(['id', 'fullName', 'username', 'email'], reduxProfile)
    setProfile(draft => {
      draft.id = profileData.id
      draft.fullName = profileData.fullName  
      draft.username = profileData.username  
      draft.email = profileData.email  
    })
  }, [reduxProfile])
  
  return (
    <React.Suspense fallback={<div>testing~~</div>}>
      <div>
      <h2>test</h2>
      <ul>
        {
          Object.keys(profile).map((item, i) => {
          return <li key={i}>{profile[item]}</li>
          })
        }
      </ul>
    </div>
    </React.Suspense>
  )
}

export default Test