import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { authActions } from 'store/actions';
import { Input } from 'components/custom';
import { validation } from 'context';
import './LoginPage.scss';

function LoginPage() {
  const { ValidatorProvider, ValidatorSubmit } = validation;
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onLogin = (payload) => dispatch(authActions.login(payload));
  const resetError = (payload) => dispatch(authActions.resetError(payload));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) history.push('/main/board');
  }, [auth, history]);

  useEffect(() => {
    setEmail('');
    setPassword('');
    setName('');
  }, [history.location]);

  const loginSubmit = () => onLogin({ email, password, name });
  const emailError = 'A user with this email could not be found.';
  const pwError = 'Wrong password!';

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
        <ValidatorProvider form onSubmit={loginSubmit}>
          <Input
            placeholder="Enter email"
            rules={['required', 'email']}
            error={auth.errorMessage === emailError && auth.errorMessage}
            onChange={(event) => {
              setEmail(event.target.value);
              if (auth.errorMessage === emailError) resetError();
            }}
          />
          <Input
            type="password"
            placeholder="Enter password"
            rules={['required']}
            error={auth.errorMessage === pwError && auth.errorMessage}
            onChange={(event) => {
              setPassword(event.target.value);
              if (auth.errorMessage === pwError) resetError();
            }}
          />
          <ValidatorSubmit text="Log In" className="login_submit" loading={auth.loading} />
        </ValidatorProvider>
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
