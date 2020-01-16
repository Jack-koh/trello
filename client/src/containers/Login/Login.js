import React, { Fragment, useState } from 'react'
import style from './Login.module.scss'
import { Redirect } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [passWord, setPassWord] = useState('')
  const [authRedirect, setAuthRedirect] = useState(null)

  const onLoginHandler = (event) => {
    event.preventDefault();
    setAuthRedirect(<Redirect to="/userName/boards" />)
  }
  return (
    <Fragment>
      {authRedirect}
      <div className={style.logo_wrap}>
        <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg" alt="logo"></img>
      </div>
      <div className={style.form_wrap}>
        <h1>Log in to Trello</h1>
        <form onSubmit={onLoginHandler}>
          <input
            type="text"
            placeholder="Enter email"
            autoFocus
            value={email}
            onChange={event => setEmail(event.target.value)} />
          <input
            className={style.scurity_text}
            placeholder="Enter password"
            value={passWord}
            onChange={event => setPassWord(event.target.value)} />
          <button >Log In</button>
        </form>
      </div>
    </Fragment>
  )
}

export default Login;