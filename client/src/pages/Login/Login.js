import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './Login.module.scss'

import * as actions from 'store/actions/index'

const cx = classNames.bind(style)

function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = props.location.pathname === '/Login' ? 1 : 0;
  // import * as actions from 'store/actions/index';

  useEffect(() => {
    setEmail('')
    setPassword('')
  }, [props.location])

  useEffect(() => {
    if (props.authRoute) props.history.replace('userName/boards')
  }, [props.authRoute, props.history])

  const submitHandler = (event) => {
    event.preventDefault();
    const params = {
      email: email,
      password: password,
      name: 'jack'
    }

    if (login) {
      props.onLogin(params)
    } else {
      // const resData = await requestRaw('api/auth/signup', 'PUT', params)
    }
    // setAuthRedirect(<Redirect to="/userName/boards" />)
  }

  // JSX Element
  let submitBtn = null;
  let utils = null;
  if (login) {
    submitBtn = <button className={cx('login_button')}>Log In</button>
    utils =
      <Fragment>
        <Link to="/find-password" className={cx('find-pw')}>Cant' log in?</Link>
        <i>·</i>
        <Link to="/Signup" className={cx('sign-up')}>Sign up for an account</Link>
      </Fragment>
  } else {
    // disabled
    submitBtn = <button className={cx('signup-button')}>Continue</button>
    utils = <Link to="/Login" className={cx('sign-up')} >Already have an account? Log In</Link>
  }


  return (
    <Fragment>
      <div className={cx('logo_wrap')}>
        <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg" alt="logo"></img>
      </div>
      <div className={cx('form_wrap')}>
        <h1>{login ? 'Log in to Trello' : 'Sign in to Trello'}</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter email"
            autoFocus
            value={email}
            onChange={event => setEmail(event.target.value)} />
          <input
            className={cx('scurity_text')}
            placeholder="Enter password"
            value={password}
            onChange={event => setPassword(event.target.value)} />
          {submitBtn}
        </form>
        <div className={cx('auth-utils')}>
          {utils}
        </div>
      </div>
    </Fragment >
  )
}

const mapStateToProps = state => {
  return {
    authRoute: state.auth.authRouter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: userData => dispatch(actions.login(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));