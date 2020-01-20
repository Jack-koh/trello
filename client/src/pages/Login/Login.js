import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './Login.module.scss'

import { requestRaw } from 'util/axios'

const cx = classNames.bind(style)

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = props.location.pathname === '/Login' ? 1 : 0;
  const [authRedirect, setAuthRedirect] = useState(null)
  // import * as actions from 'store/actions/index';

  const dispatch = useDispatch

  useEffect(() => {
    setEmail('')
    setPassword('')
  }, [props.location])

  const submitHandler = async (event) => {
    event.preventDefault();
    const params = {
      email: email,
      password: password
    }

    if (login) {
      try {
        const resData = await requestRaw('api/auth/login', 'POST', params);
        localStorage.setItem('token', resData.token)
        localStorage.setItem('userId', resData.userId)
        // dispatch(actions.login({
        //   userId: resData.userName
        // }))

        setAuthRedirect(<Redirect to="/userName/boards" />)
      } catch (err) {
        console.log(err + ' Login error')
      }
    } else {
      const response = await requestRaw('api/auth/signup', 'PUT', params)
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
      {authRedirect}
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

export default withRouter(Login);