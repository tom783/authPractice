import * as React from 'react'
import styled from 'styled-components'
import {useImmer} from 'use-immer'

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const InputBox = styled.div`
  position: relative;
  display: inline-block;
`

const Input = styled.input``

const Msg = styled.span`
  display: ${props => !!props.visible ? 'block' : 'none'};
  position: absolute;
  width: max-content;
  top: 0;
  right: 0;
  transform: translateX(100%);
`

const initState = {
  msg: '',
  value: ''
}

const ValidationInput = ({
  type,
  placeholder,
  disabled,
  validator,
  style,
  handleSetState,
}) => {
  const [state, setState] = useImmer(initState)

  const onChange = e => {
    const {value} = e.target

    setState(draft => {
      draft.value = value
      draft.msg = validator(value)
    })
    handleSetState && handleSetState(draft => {
      draft[type] = value
    })
  }

  return (
    <Wrap>
      <InputBox>
        <Input type={type} placeholder={placeholder} disabled={disabled} style={style} onChange={onChange} value={state.value} />
        <Msg visible={state.msg.length}>{state.msg}</Msg>
      </InputBox>
    </Wrap>
  )
}

export default ValidationInput