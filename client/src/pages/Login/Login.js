import React, { Fragment, useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './Login.module.scss'
// import { Redirect } from 'react-router-dom'

import { requestRaw } from 'util/axios'

const cx = classNames.bind(style)

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const path = props.location.pathname === '/Login' ? 1 : 0;
  // const [authRedirect, setAuthRedirect] = useState(null)

  useEffect(() => {
    setEmail('')
    setPassword('')
  }, [props.location])

  const toSignUp = () => {
    // this
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const params = {
      email: email,
      password: password
    }

    if (path) {
      // requestRaw('api/auth/signup', 'PUT', params)
    } else {
      const response = requestRaw('api/auth/signup', 'PUT', params)
      console.log(response)
    }
    // setAuthRedirect(<Redirect to="/userName/boards" />)
  }

  // JSX Element
  let submitBtn = null;
  let utils = null;
  if (path) {
    submitBtn = <button className={cx('login_button')}>Log In</button>
    utils =
      <Fragment>
        <Link to="/find-password" className={cx('find-pw')}>Cant' log in?</Link>
        <i>·</i>
        <Link to="/Signup" className={cx('sign-up')} onClick={toSignUp}>Sign up for an account</Link>
      </Fragment>
  } else {
    // disabled
    submitBtn = <button className={cx('signup-button')}>Continue</button>
    utils = <Link to="/Signup" className={cx('sign-up')} onClick={toSignUp}>Already have an account? Log In</Link>
  }


  return (
    <Fragment>
      {/* {authRedirect} */}
      <div className={cx('logo_wrap')}>
        <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg" alt="logo"></img>
      </div>
      <div className={cx('form_wrap')}>
        <h1>{path ? 'Log in to Trello' : 'Sign in to Trello'}</h1>
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

export default withRouter(Login);