import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import './Signup.scss'
import axios from 'axios'
import BtnLoading from 'shared/btnLoading/BtnLoading'

function Signup(props) {
  const { userData, history, location } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) history.push('/main')
  }, [userData, history])

  useEffect(() => {
    setEmail('')
    setPassword('')
    setName('')
  }, [location])

  const submitHandler = async event => {
    event.preventDefault()
    const params = { email, password, name }
    try {
      setloading(true)
      await axios.put('auth/signup', params)
      setloading(false)
      history.push('/Login')
    } catch (err) {
      setloading(false)
    }
  }

  return (
    <main className="signup_page">
      <header className="logo_wrap">
        <img
          src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg"
          alt="logo"
        />
      </header>
      <section className="form_wrap">
        <h1>Sign in to Trello</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <input
            className="scurity_text"
            placeholder="Enter password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <input
            placeholder="Enter name"
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <button type="submit" className="signup-button">
            {loading ? <BtnLoading /> : 'Continue'}
          </button>
        </form>
        <div className="auth_utils">
          <Link to="/Login" className="sign_up">
            Already have an account? Log In
          </Link>
        </div>
      </section>
    </main>
  )
}

export default withRouter(Signup)
