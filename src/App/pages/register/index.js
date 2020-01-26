import React, { useState, useEffect, useRef } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './registerForm.css';

// import loadingGif from '../../images/loading-register.gif';

const RegistrationForm = props => {
  let history = useHistory();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  // const [valid, setValid] = useState({
  //   emailValid: false,
  //   firstNameValid: false,
  //   lastNameValid: false,
  //   passwordValid: false
  // });

  const [error, setError] = useState(false);
  const [renderState, setRenderState] = useState({
    showErrorDiv: false,
    showLoading: false
  });
  const [sessionTokenState, setSessionToken] = useState(null);

  let oktaAuth = useRef(null);

  useEffect(() => {
    oktaAuth.current = new OktaAuth({ url: 'https://dev-789825.okta.com' });
    checkAuthentication();
  }, []);

  useEffect(() => {
    checkAuthentication();
  });

  const checkAuthentication = async () => {
    const sessionToken = await props.auth.getIdToken();
    if (sessionToken) {
      setSessionToken(sessionToken);
    }
  };

  const handleInvalidSubmit = (event, errors, values) => {
    setError(true);
  };

  const handleChangeInput = e => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = e => {
    setRenderState({ showErrorDiv: false, showLoading: true });
    axios
      .post('/api/users', user) // send token ?
      .then(user => {
        oktaAuth
          .signIn({
            username: user.email,
            password: user.password
          })
          .then(res => {
            localStorage.setItem('oktaID', res.user.id);
            setRenderState({
              showLoading: false,
              showErrorDiv: false
            });
            setSessionToken(res.sessionToken);
          });
      })
      .catch(err => {
        console.log(err);
        setRenderState({ showErrorDiv: true, showLoading: false });
      });
  };

  if (sessionTokenState) {
    props.auth.redirect({ sessionToken: sessionTokenState });
    return null;
  }
  return (
    <div id="widget-container1">
      <div id="okta-register" className="auth-container1 main-container">
        <div className="okta-register-header auth-header">
          <img
            src="//logo.clearbit.com/okta.com?greyscale=true"
            className="auth-org-logo"
            alt=""
          />
          {/* {renderState.showLoading && (
            // <img src={loadingGif} className="loading-gif" alt="" />
          )} */}
        </div>
        <div className="auth-content">
          <div className="auth-content-inner">
            <AvForm
              onValidSubmit={handleSubmit}
              onInvalidSubmit={handleInvalidSubmit}
              className="primary-auth-form o-form o-form-edit-mode"
            >
              {renderState.showErrorDiv && (
                <div
                  className="o-form-error-container o-form-has-errors"
                  data-se="o-form-error-container"
                >
                  <div
                    className="okta-form-infobox-error infobox infobox-error"
                    role="alert"
                  >
                    <span className="icon error-16" />
                    <p>Error, A user with this Email already exists.</p>
                  </div>
                </div>
              )}
              <h2 className="okta-form-title o-form-head">Create Account</h2>
              <div className="form-element">
                <AvField
                  name="email"
                  label="Email:"
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={handleChangeInput}
                  autoComplete="username email"
                  required
                  validate={{
                    required: {
                      value: true,
                      errorMessage: 'Please enter an email'
                    }
                  }}
                />
              </div>
              <div className="form-element">
                <AvField
                  name="firstName"
                  label="First Name:"
                  type="text"
                  id="firstName"
                  value={user.firstName}
                  onChange={handleChangeInput}
                  minLength="2"
                  required
                  validate={{
                    required: {
                      value: true,
                      errorMessage: 'Please enter your first name'
                    },
                    minLength: {
                      value: 2,
                      errorMessage:
                        'Your first name must be at least 2 characters'
                    },
                    pattern: {
                      value: '^[A-Za-z]+$',
                      errorMessage: 'Only letters are allowed in first name'
                    }
                  }}
                />
              </div>
              <div className="form-element">
                <AvField
                  name="lastName"
                  label="Last Name:"
                  type="text"
                  id="lastName"
                  minLength="2"
                  value={user.lastName}
                  onChange={handleChangeInput}
                  required
                  validate={{
                    required: {
                      value: true,
                      errorMessage: 'Please enter your last name'
                    },
                    minLength: {
                      value: 2,
                      errorMessage:
                        'Your last name must be at least 2 characters'
                    },
                    pattern: {
                      value: '^[A-Za-z]+$',
                      errorMessage: 'only letters are allowed in last name'
                    }
                  }}
                />
              </div>
              <div className="form-element">
                <AvField
                  name="password"
                  label="Password:"
                  type="password"
                  id="password"
                  minLength="8"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                  value={user.password}
                  onChange={handleChangeInput}
                  autoComplete="current-password"
                  required
                  validate={{
                    required: {
                      value: true,
                      errorMessage: 'Please enter a password'
                    },
                    pattern: {
                      value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$',
                      errorMessage:
                        'password must contain at least 8 characters, at least 1 number and both lower and uppercase letters'
                    }
                  }}
                />
              </div>
              <div className="o-form-button-bar">
                {renderState.showLoading ? (
                  <input
                    className="button button-primary link-button-disabled"
                    type="submit"
                    value="Register"
                    id="submit"
                    data-type="save"
                    disabled
                  />
                ) : (
                  <input
                    className="button button-primary"
                    type="submit"
                    value="Register"
                    id="submit"
                    data-type="save"
                  />
                )}
              </div>
              <div className="signin-container">
                <div className="content">
                  <span className="signin-label">
                    Already have an account?{' '}
                  </span>
                  <span
                    className="signin-link"
                    onClick={() => {
                      history.push('/login');
                    }}
                  >
                    Sign in
                  </span>
                </div>
              </div>
            </AvForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(RegistrationForm);
