import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import './SignupPage.scss';

import { Button } from 'components/custom/Elements';

function SignupPage(props) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) history.push('/main');
  }, [history]);

  useEffect(() => {
    setEmail('');
    setPassword('');
    setName('');
  }, [history.location]);

  const signupSubmit = async (event) => {
    event.preventDefault();
    const params = { email, password, name };
    try {
      setloading(true);
      await axios.put('auth/signup', params);
      setloading(false);
      history.push('/Login');
    } catch (err) {
      setloading(false);
    }
  };

  return (
    <div className="signup_page">
      <header className="logo_wrap">
        <img
          src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg"
          alt="logo"
        />
      </header>
      <section className="form_wrap">
        <h1>Sign in to Trello</h1>
        <form onSubmit={signupSubmit}>
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="scurity_text"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Button className="signup_submit" type="submit" text="Continue" loading={loading} />
        </form>
        <div className="auth_utils">
          <Link to="/Login" className="sign_up">
            Already have an account? Log In
          </Link>
        </div>
      </section>
    </div>
  );
}

export default SignupPage;
