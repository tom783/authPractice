import * as React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Test from '../pages/Test'
import Main from '../pages/Main'
import SendResetEmail from '../pages/SendResetEmail'
import ResetPassword from '../pages/ResetPassword'
import Layout from './layout'

function App() {
  const WrapLayout = (routeProps, Component) => {
    return (
      <Layout {...routeProps}>
        <Component {...routeProps} />
      </Layout>
    )
  }

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/test' component={Test} layout={Layout} />
        <Route
          exact
          path='/'
          render={(routeProps) => WrapLayout(routeProps, Main)}
        />
        <Route
          exact
          path='/signin'
          render={(routeProps) => WrapLayout(routeProps, SignIn)}
        />
        <Route
          exact
          path='/signup'
          render={(routeProps) => WrapLayout(routeProps, SignUp)}
        />
        <Route
          exact
          path='/send-reset-email'
          render={(routeProps) => WrapLayout(routeProps, SendResetEmail)}
        />
        <Route
          exact
          path='/resetPassword/:tokenId'
          render={(routeProps) => <ResetPassword {...routeProps} />}
        />
      </Switch>
    </Router>
  )
}

export default App
