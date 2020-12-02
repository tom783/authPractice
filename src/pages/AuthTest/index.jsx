import * as React from 'react'
import {Switch, Route, Redirect, BrowserRouter as Router} from 'react-router-dom'
import Cookie from 'js-cookie';
import SignIn from '../SignIn'
import Test from '../Test'

const AuthTest = () => {
  
  console.log("isLogin", Cookie.get('token'))
  const isLogin = Cookie.get('token')
  React.useEffect(() => {
    
  },[])


  return (
    <Router>
      {
        isLogin?
        <Switch>
          <Route exact path="/test">
            <Test />
          </Route>
        </Switch>
        :
        <>
        <SignIn />
        <Redirect to="/signIn" />
        </>
      }
    </Router>
  )
}

export default AuthTest