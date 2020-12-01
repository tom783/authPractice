import * as React from 'react'
import {Switch, Route, Redirect, BrowserRouter as Router} from 'react-router-dom'
import SignIn from '../SignIn'
import Test from '../Test'

const AuthTest = () => {
  const [pass, setPass] = React.useState(false)

  const asyncFunc = async () => {
    let res = null
    
    res = await fetch('https://jsonplaceholder.typicode.com/users/1').then(res => res.json())
    console.log("res", res)
    setPass(null)
  }

  React.useEffect(() => {
    asyncFunc()
  },[])

  console.log("render route", pass)

  return (
    <Router>
      {
        pass?
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