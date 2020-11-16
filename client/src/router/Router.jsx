import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'
import * as actions from 'store/actions'

import LoginPage from 'pages/login/LoginPage'
import SignupPage from 'pages/signup/SignupPage'
import MainRoute from 'router/routes/main/MainRoute'

function Router(props) {
  return (
    <Switch>
      <Route exact path="/Login" component={LoginPage} />
      <Route path="/Signup" component={SignupPage} />
      <Route path="/main" component={MainRoute} />
      <Redirect to="/Login" />
    </Switch>
  )
}

export default Router

const AuthRoute = ({ exact, path, component: Component }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const autoAuthCheck = useCallback(() => dispatch(actions.authCheck()), [dispatch])

  useEffect(() => {
    autoAuthCheck()
    const token = localStorage.getItem('token')
    if (!token && path !== '/Signup') history.push('/Login')
  }, [autoAuthCheck, Component])
  return <Route exact={exact} path={path} component={Component} />
}
