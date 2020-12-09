import * as React from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {useImmer} from 'use-immer'
import {useHistory} from 'react-router-dom'

import Validationinput, {handleSetState} from '../../components/ValidationInput'
import {passwordValidator} from '../../utils/validators'
import { resetPassword, checkResetPasswordToken } from '../../utils/api'
import {resetPasswordFlow} from '../../utils/flowInSaga'
import { authRequest } from '../../store/reducers/authSlice'

const Wrap = styled.div``

const Form = styled.form``

const initState = {
  isFetching: false,
  checkOk: false,
  type: '',
  data: null
}

const formState = {
  password: '',
  passwordAgain: ''
}

const ResetPassword = (props) => {
  const [state, setState] = useImmer(initState)
  const [form, setForm] = useImmer(formState)
  const {params: {tokenId}} = props.match
  const dispatch = useDispatch()
  const history = useHistory()
  
  const onSubmit = e => {
    e.preventDefault()
    resetPassword({...form, passwordResetToken: tokenId}, setState)
    setState(draft => {
      draft.type = 'resetPassword'
    })
  }

  React.useLayoutEffect(() => {
    checkResetPasswordToken(tokenId, setState)
    setState(draft => {
      draft.type = 'checkResetPasswordToken'
    })
  },[])

  React.useEffect(() => {
    if(state.data){
      setState(draft => {
        draft.isFetching = true
      })
      switch(state.type) {
        case 'checkResetPasswordToken':
          dispatch(authRequest({resData: state.data}))
          break
        case 'resetPassword':
          dispatch(authRequest({resData: state.data, sagaFlow: resetPasswordFlow, history}))
          break
        default:
          break
      }
    }else {
      setState(draft => {
        draft.isFetching = false
      })
    }
  }, [state.data])

  const resetForm = () => {
    return (
      <>
        <Wrap>
          <h2>Reset password</h2>
          <Form onSubmit={onSubmit}>
            <div>
              <Validationinput type="password" placeholder="비밀번호" disabled={false} validator={passwordValidator} handleSetState={handleSetState('password', setForm)} />
            </div>
            <div>
              <Validationinput type="password" placeholder="비밀번호 재입력" disabled={false} validator={passwordValidator} handleSetState={handleSetState('passwordAgain', setForm)} />
            </div>
            <div>
              <input type="submit" value="비밀번호 변경" />
            </div>
          </Form>
        </Wrap>
      </>
    )
  }

  const Loading = () => {
    return <div>loading</div>
  }
  const Error = () => {
    return <div>error</div>
  }

  const content = state.isFetching ? 
  Loading() : 
  state.checkOk ? 
  resetForm() :
  Error()

  return (
    <>
      {content}
    </>
  )
}

export default ResetPassword