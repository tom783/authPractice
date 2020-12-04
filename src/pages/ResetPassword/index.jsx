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
  checkOk: false,
  isFetching: false
}

const formState = {
  password: '',
  passwordAgain: ''
}

const ResetPassword = (props) => {
  const [state, setState] = useImmer(initState)
  const [form, setForm] = useImmer(formState)
  const isFetching = useSelector(state => state.auth.isFetching)
  const checkOk = useSelector(state => state.auth.isValid)
  const {params: {tokenId}} = props.match
  const dispatch = useDispatch()
  const history = useHistory()
  
  const onSubmit = e => {
    e.preventDefault()
    dispatch(authRequest({apiCall: () => resetPassword({...form, passwordResetToken: tokenId}), sagaFlow: resetPasswordFlow, history}))

  }

  React.useLayoutEffect(() => {
    dispatch(authRequest({apiCall: () => checkResetPasswordToken(tokenId)}))
  },[])

  React.useEffect(() => {
    if(isFetching) {
      setState(draft => {
        draft.isFetching = true
      })
    }else {
      setState(draft => {
        draft.isFetching = false
      })
    }
    if(checkOk) {
      setState(draft => {
        draft.checkOk = true
      })
    }else {
      setState(draft => {
        draft.checkOk = false
      })
    }
    
  }, [checkOk, isFetching])

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

  const content = isFetching ? 
  Loading() : 
  checkOk ? 
  resetForm() :
  Error()

  return (
    <>
      {content}
    </>
  )
}

export default ResetPassword