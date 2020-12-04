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
      <h2>Signup</h2>
      <Form onSubmit={onSubmit}>
        <div>
          <Validationinput type="text" placeholder="이름" disabled={false} handleSetState={handleSetState('fullName', setState)} />
          <Validationinput type="email" placeholder="이메일" disabled={false} validator={emailValidator} handleSetState={handleSetState('email', setState)} />
          <Validationinput type="password" placeholder="비밀번호" disabled={false} validator={passwordValidator} handleSetState={handleSetState('password', setState)} />
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