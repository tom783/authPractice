import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'
import Cookies from 'js-cookie'
import { authOut } from '../../store/reducers/authSlice'

const Wrap = styled.div``

const Content = styled.div``

const Layout = ({children}) => {
  const isAuthenticate = useSelector(state => state.profile.originalProfile.id)

  const dispatch = useDispatch()
  
  const onClickSignOut = e => {
    e.preventDefault()
    console.log("click")
    Cookies.remove('token')
    dispatch(authOut())
  }

  return (
    <Wrap>
      <div>
        <Link to="/">home</Link>
      </div>
      <div>
        {
          isAuthenticate?
          <button onClick={onClickSignOut}>로그인아웃</button>
          :
          <>
            <div><Link to="/signin">로그인하러가기</Link></div>
            <div><Link to="/signup">회원가입하러가기</Link></div>
            <div><Link to="/send-reset-email">비밀번호찾으러가기</Link></div>
          </>
        }
      </div>
      <Content>
        {children}
      </Content>
    </Wrap>
  )
}

export default Layout