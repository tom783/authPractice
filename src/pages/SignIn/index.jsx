import * as React from 'react'
import styled from 'styled-components'
import {useImmer} from 'use-immer'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

import Validationinput from '../../components/ValidationInput'
import {emailValidator, passwordValidator} from '../../utils/validators'
import {authRequest} from '../../store/reducers/authSlice'
import {signinApi, signinGoogleApi} from '../../utils/api'
import {signinFlow, signinGoogle} from '../../utils/flowInSaga'

const Wrap = styled.div``

const LoginWrap = styled.div`
  h2 {
    text-align: center;
  }
`

const LoginForm = styled.form``

const initState = {
  email: '',
  password: ''
}

const SignIn = (props) => {
  const [state, setState] = useImmer(initState)
  const {auth} = useSelector(state => state)

  const dispath = useDispatch()
  const history = useHistory()

  const onSubmit = e => {
    e.preventDefault()
    if(!auth.isFetching){
      dispath(authRequest({apiCall: () => signinApi(state), sagaFlow: signinFlow, history}))
    }
  }

  const onClickToGoogleSignin = e => {
    e.preventDefault()
    if(!auth.isFetching){
      dispath(authRequest({apiCall: () => signinGoogleApi({isSignedin: true}), sagaFlow: signinGoogle}))
    }
  }

  return (
    <Wrap>
      <div>
        <a href="/">home</a>
      </div>
      <LoginWrap>
        <h2>login</h2>
        <LoginForm onSubmit={onSubmit}>
          <div>
            <Validationinput type="email" placeholder="이메일" disabled={false} validator={emailValidator} handleSetState={setState} />
            <Validationinput type="password" placeholder="비밀번호" disabled={false} validator={passwordValidator} handleSetState={setState} />
          </div>
          <div>
            <a href="#" onClick={onClickToGoogleSignin}>구글 로그인</a>
          </div>
          <div>
            <input type="submit" value="로그인" />
          </div>
        </LoginForm>
      </LoginWrap>
    </Wrap>
  )
}

export default SignIn