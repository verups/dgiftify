import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './components/OktaSignInWidget';
import { withAuth } from '@okta/okta-react';
import { AuthContext } from '../../../Common/Contexts';

const Login = props => {
  const { isAuthenticated, dispatch } = useContext(AuthContext);

  useEffect(() => {
    checkAuthentication();
  });

  const checkAuthentication = async () => {
    const authenticated = await props.auth.isAuthenticated();
    if (authenticated !== isAuthenticated) {
      dispatch({
        type: 'UPDATE_USER_STATE',
        payload: authenticated
      });
    }
  };

  const onSuccess = res => {
    if (res.status === 'SUCCESS') {
      dispatch({
        type: 'LOGIN',
        payload: res.session.token
      });
      return this.props.auth.redirect({
        sessionToken: res.session.token
      });
    } else {
      // show message bad login
    }
  };

  const onError = err => {
    dispatch({
      type: 'ONERROR',
      payload: null
    });
    console.log('error logging in', err);
  };

  if (isAuthenticated === null) return null;
  return isAuthenticated ? (
    <Redirect to={{ pathname: '/' }} />
  ) : (
    <OktaSignInWidget
      baseUrl={props.baseUrl}
      onSuccess={onSuccess}
      onError={onError}
    />
  );
};

export default withAuth(Login);
