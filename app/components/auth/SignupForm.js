import React from 'react';
import { Link } from 'react-router';
import ErrorMessage from './ErrorMessage';

const SignupForm = (props) => {
  return (
    <div>
      <div className="ui centered padded container raised segment">
      <h1 className="ui header center aligned">Spread Out</h1>
      <div className="ui attached message">
        <div className="header">
          Welcome!
        </div>
        <p>Fill out the form below to sign up for a new account.</p>
      </div>
        <form
          className="ui form attached fluid segment signup"
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
            onClick={props.onSignupSubmit}
          >Sign Up</button>
        </form>
        <div className="ui bottom attached warning message">
          <i className="icon help"></i>
          Already signed up? <Link to={'/signin'}>Login here</Link> instead.
        </div>
        <ErrorMessage
          errorMessage={props.errorMessage}
        />
      </div>
       <button className="ui button" >
        <a href="/auth/instagram">sign up with instagram</a>
      </button>
    </div>
  );
};

export default SignupForm;
