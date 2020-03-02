import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import './Login.scss'
import * as actions from 'store/actions'

import Spinner from 'shared/spinner/Spinner'

function Login(props) {
  const { userData, history, location } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) history.push('/main/boards')
  }, [userData, history])

  useEffect(() => {
    setEmail('')
    setPassword('')
    setName('')
  }, [location])

  useEffect(() => {
    setloading(userData.loading)
  }, [userData])

  const submitHandler = async e => {
    e.preventDefault()
    const params = { email, password, name }
    props.onLogin(params)
  }

  return (
    <main className="login_page">
      <header className="logo_wrap">
        <img
          src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg"
          alt="logo"
        />
      </header>
      <section className="form_wrap">
        <h1>Log in to Trello</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter email"
            onChange={event => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            onChange={event => setPassword(event.target.value)}
          />
          <button type="submit" className="login_button">
            {loading ? <Spinner /> : 'Log In'}
          </button>
        </form>
        <div className="auth_utils">
          <Link to="/find-password" className="find_pw">
            Can't log in?
          </Link>
          <i>·</i>
          <Link to="/Signup" className="sign_up">
            Sign up for an account
          </Link>
        </div>
      </section>
    </main>
  )
}

const mapStateToProps = state => {
  return {
    userData: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: userData => dispatch(actions.loginStart(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
