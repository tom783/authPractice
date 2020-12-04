import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookie from 'js-cookie'

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const isLogin = Cookie.get('token')
  const isLogout = !isLogin

  const {auth} = useSelector(state => state)

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (isLogout && !auth.isValid) {
          return <Redirect to={rest.to ? rest.to : '/signin'} />
        } else if (rest.redirect) {
          return <Redirect to={rest.redirect} />
        } else if(Layout) {
          return <Layout {...routeProps} ><Component {...routeProps} /></Layout>
        } else {
          return <Component {...routeProps} />
        }
      }}
    />
  )
}

export default PrivateRoute
