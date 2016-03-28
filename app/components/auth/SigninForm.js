import React from 'react';
import { Link } from 'react-router';
import ErrorMessage from './ErrorMessage';

const SigninForm = (props) => {
  return (
    <div>
      <div className="ui centered padded container raised segment">
        <h1 className="ui header center aligned">Spread Out</h1>
        <div className="ui attached message">
          <div className="header">
            Welcome back!
          </div>
          <p>Sign in to Spread Out.</p>
        </div>
        <form
          className="ui form attached fluid segment signin"
          onSubmit={props.preventDefaultSubmit}
        >
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={props.email}
              onChange={props.onEmailChange}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={props.password}
              onChange={props.onPasswordChange}
            />
          </div>
          <button
            className="ui button"
            type="submit"
            onClick={props.onSigninSubmit}
          >Sign In</button>
        </form>
        <div className="ui bottom attached warning message">
          <i className="icon help"></i>
          Don't have an account? <Link to={'/signup'}>Sign up here</Link> instead.
        </div>
        <ErrorMessage
          errorMessage={props.errorMessage}
        />
      </div>
      <button className="ui button" >
        <a href="/auth/instagram">log in with instagram</a>
      </button>
    </div>
  );
};

export default SigninForm;
