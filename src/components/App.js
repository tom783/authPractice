import * as React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Test from '../pages/Test'
import Main from '../pages/Main'

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/test' component={Test} />
        <Route exact path='/' component={Main} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
      </Switch>
    </Router>
  )
}

export default App
