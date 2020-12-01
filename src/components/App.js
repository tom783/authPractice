import * as React from "react"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import AuthTest from "../pages/AuthTest"

function App() {
  return (
    <Router>
      <Switch>
        {/* {
        localStorage.getItem('accessToken') ? 
          <AuthTest />
          :
          <Redirect to="/signIn" />
        } */}
        <Route exact path='/signIn' component={SignIn} />
        <Route exact path='/signUp' component={SignUp} />
        <AuthTest />
      </Switch>
    </Router>
  )
}

export default App
