import React, { Fragment, useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./Signup.module.scss";
import { requestRaw } from "shared/axios";

import Spinner from "shared/spinner/Spinner";

const cx = classNames.bind(style);

function Signup(props) {
  console.log("Login - check");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!!token) props.history.push("/main");
  }, [props.userData, props.history]);

  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
  }, [props.location]);

  const submitHandler = async event => {
    event.preventDefault();
    const params = {
      email: email,
      password: password,
      name: name
    };
    try {
      setloading(true);
      await requestRaw("auth/signup", "PUT", params);
      setloading(false);
      props.history.push("/Login");
    } catch (err) {
      setloading(false);
    }
  };

  return (
    <Fragment>
      <div className={cx("logo_wrap")}>
        <img
          src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg"
          alt="logo"
        ></img>
      </div>
      <div className={cx("form_wrap")}>
        <h1>Sign in to Trello</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter email"
            autoFocus
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <input
            className={cx("scurity_text")}
            placeholder="Enter password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <input
            placeholder="Enter name"
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <button className={cx("signup-button")}>
            {loading ? <Spinner /> : "Continue"}
          </button>
        </form>
        <div className={cx("auth-utils")}>
          <Link to="/Login" className={cx("sign-up")}>
            Already have an account? Log In
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default withRouter(Signup);
