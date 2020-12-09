import * as React from 'react'
import {useImmer} from 'use-immer'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory, Link} from 'react-router-dom'

import Validationinput, {handleSetState} from '../../components/ValidationInput'
import {authRequest} from '../../store/reducers/authSlice'
import {emailValidator, passwordValidator} from '../../utils/validators'
import {signupApi, signupGoogleApi} from '../../utils/api'
import {signupFlow, signupGoogleFlow} from '../../utils/flowInSaga'

const Wrap = styled.div``

const Form = styled.form``

const initState = {
  type: '',
  data: null
}

const formState = {
  fullName: '',
  email: '',
  password: ''
}

const SignUp = () => {
  const [state, setState] = useImmer(initState)
  const [form, setForm] = useImmer(formState)
  const {auth} = useSelector(state => state)

  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = e => {
    e.preventDefault()
    signupApi(form, setState)
    setState(draft => {
      draft.type = 'baseSignup'
    })
  }

  const onClickToGoogleSignUp = e => {
    e.preventDefault()
    signupGoogleApi({isSignedin: false}, setState)
    setState(draft => {
      draft.type = 'googleSignup'
    })
  }

  React.useEffect(() => {
    if(state.data) {
      switch(state.type) {
        case 'baseSignup':
          dispatch(authRequest({resData: state.data, sagaFlow: signupFlow, history}))
          break
        case 'googleSignup':
          dispatch(authRequest({resData: state.data, sagaFlow: signupGoogleFlow}))
          break
        default:
          break
      }
    }
  }, [state.data])

  return (
    <Wrap>
      <h2>Signup</h2>
      <Form onSubmit={onSubmit}>
        <div>
          <Validationinput type="text" placeholder="이름" disabled={false} handleSetState={handleSetState('fullName', setForm)} />
          <Validationinput type="email" placeholder="이메일" disabled={false} validator={emailValidator} handleSetState={handleSetState('email', setForm)} />
          <Validationinput type="password" placeholder="비밀번호" disabled={false} validator={passwordValidator} handleSetState={handleSetState('password', setForm)} />
        </div>
        <div>
          <Link to="#" onClick={onClickToGoogleSignUp}>구글 회원가입</Link>
        </div>
        <div>
          <input type="submit" value="회원가입" />
        </div>
      </Form>
    </Wrap>
  )
}

export default SignUp