import * as React from 'react'
import styled from 'styled-components'
import {useImmer} from 'use-immer'
import {useDispatch} from 'react-redux'

import Validationinput from '../../components/ValidationInput'
import {emailValidator, passwordValidator} from '../../utils/validators'
import {authRequest} from '../../store/reducers/authSlice'

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

  const dispath = useDispatch()

  const onSubmit = e => {
    e.preventDefault()
    dispath(authRequest(state))
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
            <input type="submit" value="로그인" />
          </div>
        </LoginForm>
      </LoginWrap>
    </Wrap>
  )
}

export default SignIn