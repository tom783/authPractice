import * as React from 'react'
import {useImmer} from 'use-immer'
import styled from 'styled-components'
import Validationinput from '../../components/ValidationInput'
import {emailValidator, passwordValidator} from '../../utils/validators'

const Wrap = styled.div``

const LoginWrap = styled.div`
 h2 {
    text-align: center;
  }
`
const LoginForm = styled.form``

const initState = {
  name: '',
  email: '',
  password: ''
}

const SignUp = () => {
  const [state, setState] = useImmer(initState)

  const onSubmit = () => {}
  
  const onClickToGoogleSignUp = () => {}


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