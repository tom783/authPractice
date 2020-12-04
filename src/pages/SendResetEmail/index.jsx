import * as React from 'react'
import styled from 'styled-components'
import {useImmer} from 'use-immer'
import {useDispatch} from 'react-redux'

import Validationinput, {handleSetState} from '../../components/ValidationInput'
import {emailValidator} from '../../utils/validators'
import { authRequest } from '../../store/reducers/authSlice'
import { sendResetEmail } from '../../utils/api'

const Form = styled.form``

const initState = {
  email: ''
}

const SendResetEmail = () => {
  const [state, setState] = useImmer(initState)

  const dispath = useDispatch()

  const onSubmit = e => {
    e.preventDefault()
    dispath(authRequest({apiCall: () => sendResetEmail(state)}))
  }

  return (
    <div>
      <h2>Send Reset Email</h2>
      <Form onSubmit={onSubmit}>
        <div>
          <Validationinput type="email" placeholder="이메일" disabled={false} validator={emailValidator} handleSetState={handleSetState('email', setState)} />
        </div>
        <div>
          <input type="submit" value="메일 보내기" />
        </div>
      </Form>
    </div>
  )
}

export default SendResetEmail