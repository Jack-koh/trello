import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import * as actions from 'store/actions';
import './LoginPage.scss';

import { Button } from 'components/custom';

function LoginPage() {
  const history = useHistory();
  const userData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onLogin = (payload) => dispatch(actions.loginStart(payload));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) history.push('/main/board');
  }, [userData, history]);

  useEffect(() => {
    setEmail('');
    setPassword('');
    setName('');
  }, [history.location]);

  useEffect(() => {
    setloading(userData.loading);
  }, [userData]);

  const loginSubmit = async (e) => {
    e.preventDefault();
    onLogin({ email, password, name });
  };

  return (
    <div className="login_page">
      <header className="logo_wrap">
        <img
          src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg"
          alt="logo"
        />
      </header>
      <section className="form_wrap">
        <h1>Log in to Trello</h1>
        <form onSubmit={loginSubmit}>
          <input
            type="text"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button className="login_submit" type="submit" text="Log In" loading={loading} />
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
    </div>
  );
}

export default LoginPage;
