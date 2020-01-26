import React, { useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { useHistory } from 'react-router-dom';
import { useIsMounted } from '../../../../Common/Hooks';

const OktaSignInWidget = props => {
  let history = useHistory();
  const isMounted = useIsMounted();

  let widgetRef = useRef(null);
  let elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    widgetRef.current = new OktaSignIn({
      baseUrl: props.baseUrl,
      logo: '',
      features: {
        registration: true
      },
      i18n: {
        en: {
          'errors.E0000004':
            'Invalid Credentials- User not registered or Password is incorrect.'
        }
      },
      registration: {
        click: () => {
          history.push('/register');
        }
      }
    });
    widgetRef.current.renderEl({ el }, props.onSuccess, props.onError);
  }, [props.baseUrl, history, widgetRef, props.onError, props.onSuccess]);

  useEffect(() => {
    if (isMounted && widgetRef) {
      return () => {
        widgetRef.current.remove();
      };
    }
  }, [widgetRef, isMounted]);

  return <div ref={elementRef}>{props.children}</div>;
};

export default OktaSignInWidget;
