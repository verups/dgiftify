import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  Fragment
} from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { useHistory } from 'react-router-dom';
import { useIsMounted } from '../../../../Common/Hooks';

const OktaSignInWidget = props => {
  let history = useHistory();
  // const [widget, setWidget] = useState(null);
  // const widgetRef = useRef(widget);

  const isMounted = useIsMounted();

  let widget = null;
  let fragmentRef = useRef(null);

  useEffect(() => {
    const el = fragmentRef.current;

    widget = new OktaSignIn({
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
    widget.renderEl({ el }, props.onSuccess, props.onError);

    // setWidget(widgetLogin);
  }, [props.baseUrl, history, widget]);

  useEffect(() => {
    if (isMounted && widget) {
      return () => {
        widget.remove();
      };
    }
  }, [widget, isMounted]);

  return <div ref={fragmentRef}>{props.children}</div>;
};

export default OktaSignInWidget;
