import * as React from 'react'
import {useImmer} from 'use-immer'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

import Validationinput, {handleSetState} from '../../components/ValidationInput'
import {authRequest} from '../../store/reducers/authSlice'
import {emailValidator, passwordValidator} from '../../utils/validators'
import {signupApi, signupGoogleApi} from '../../utils/api'
import {signupFlow, signupGoogleFlow} from '../../utils/flowInSaga'

const Wrap = styled.div``

const LoginWrap = styled.div`
 h2 {
    text-align: center;
  }
`
const LoginForm = styled.form``

const initState = {
  fullName: '',
  email: '',
  password: ''
}

const SignUp = () => {
  const [state, setState] = useImmer(initState)
  const {auth} = useSelector(state => state)

  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = e => {
    e.preventDefault()
    if(!auth.isFetching){
      dispatch(authRequest({apiCall: () => signupApi(state), sagaFlow: signupFlow, history}))
    }
  }

  const onClickToGoogleSignUp = e => {
    e.preventDefault()
    if(!auth.isFetching){
      dispatch(authRequest({apiCall: () => signupGoogleApi({ isSignedin: false }), sagaFlow: signupGoogleFlow}))
    }
  }

  return (
    <Wrap>
      <div>
        <a href="/">home</a>
      </div>
      <LoginWrap>
        <h2>Signup</h2>
        <LoginForm onSubmit={onSubmit}>
          <div>
            <Validationinput type="text" placeholder="이름" disabled={false} handleSetState={handleSetState('fullName', setState)} />
            <Validationinput type="email" placeholder="이메일" disabled={false} validator={emailValidator} handleSetState={handleSetState('email', setState)} />
            <Validationinput type="password" placeholder="비밀번호" disabled={false} validator={passwordValidator} handleSetState={handleSetState('password', setState)} />
          </div>
          <div>
            <a href="#" onClick={onClickToGoogleSignUp}>구글 회원가입</a>
          </div>
          <div>
            <input type="submit" value="회원가입" />
          </div>
        </LoginForm>
      </LoginWrap>
    </Wrap>
  )
}

export default SignUp