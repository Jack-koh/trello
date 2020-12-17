import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { validation } from 'context';
import { Input } from 'components/custom';

import './SignupPage.scss';

function SignupPage() {
  const { ValidatorProvider, ValidatorSubmit } = validation;
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setloading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) history.push('/main');
  }, [history]);

  useEffect(() => {
    setEmail('');
    setPassword('');
    setName('');
  }, [history.location]);

  const signupSubmit = async () => {
    const params = { email, password, name };
    try {
      setloading(true);
      const response = await axios.put('auth/signup', params);
      const { errorMessage } = response.data;
      errorMessage ? setError(errorMessage) : history.push('/Login');
      setloading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const emailError = 'User email is alreay exist.';

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
        <ValidatorProvider form onSubmit={signupSubmit}>
          <Input
            placeholder="Enter email"
            value={email}
            rules={['required', 'email']}
            error={error === emailError && error}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            className="scurity_text"
            type="password"
            placeholder="Enter password"
            value={password}
            rules={['required']}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Input
            placeholder="Enter name"
            value={name}
            rules={['required']}
            onChange={(event) => setName(event.target.value)}
          />
          <ValidatorSubmit className="signup_submit" text="Continue" loading={loading} />
        </ValidatorProvider>
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
