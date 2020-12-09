import * as React from 'react'
import styled from 'styled-components'
import {useImmer} from 'use-immer'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, Link} from 'react-router-dom'

import Validationinput, {handleSetState} from '../../components/ValidationInput'
import {emailValidator, passwordValidator} from '../../utils/validators'
import {authRequest} from '../../store/reducers/authSlice'
import {signinApi, signinGoogleApi} from '../../utils/api'
import {signinFlow, signinGoogleFlow} from '../../utils/flowInSaga'

const Wrap = styled.div``

const LoginWrap = styled.div`
  h2 {
    text-align: center;
  }
`

const Form = styled.form``

const initState = {
  type: '',
  data: null
}

const formState = {
  email: '',
  password: ''
}

const SignIn = () => {
  const [state, setState] = useImmer(initState)
  const [form, setForm] = useImmer(formState)
  const {auth} = useSelector(state => state)

  const dispath = useDispatch()
  const history = useHistory()
  

  const onSubmit = e => {
    e.preventDefault()
    signinApi(form, setState)
    setState(draft => {
      draft.type = 'baseLogin'
    })
  }

  const onClickToGoogleSignin = e => {
    e.preventDefault()
    signinGoogleApi({isSignedin: true}, setState)
    setState(draft => {
      draft.type = 'googleLogin'
    })
  }

  React.useEffect(() => {
    if(state.data){
      switch(state.type) {
        case 'baseLogin':
          dispath(authRequest({resData: state.data, sagaFlow: signinFlow, history}))
          break
        case 'googleLogin':
          dispath(authRequest({resData: state.data, sagaFlow: signinGoogleFlow}))
          break
        default:
          break
      }
    }
  }, [state.data])

  return (
    <Wrap>
      <div>
        {state.data ? <div>done {JSON.stringify(state.data)}</div> : <div>loading</div>}
      </div>
      <h2>login</h2>
      <Form onSubmit={onSubmit}>
        <div>
          <Validationinput type="email" placeholder="이메일" disabled={false} validator={emailValidator} handleSetState={handleSetState('email', setForm)} />
          <Validationinput type="password" placeholder="비밀번호" disabled={false} validator={passwordValidator} handleSetState={handleSetState('password', setForm)} />
        </div>
        <div>
          <Link to="#" onClick={onClickToGoogleSignin}>구글 로그인</Link>
        </div>
        <div>
          <input type="submit" value="로그인" />
        </div>
      </Form>
    </Wrap>
  )
}

export default SignIn