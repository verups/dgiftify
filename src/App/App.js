import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppIntlProvider, AuthProvider } from '../Common/Contexts';

const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/login'));

const NotFoundPage = () => <div>Not Found</div>;
const RedirectToHome = () => <Redirect noThrow to="/" />;

const config = {
  issuer: `${process.env.REACT_APP_ISSUER_OKTA}/oauth2/default`,
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: `${process.env.REACT_APP_CLIENT_OKTA}`,
  pkce: true
};

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8561c5',
      main: '#673ab7',
      dark: '#482880',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ffd453',
      main: '#ffca28',
      dark: '#b28d1c',
      contrastText: '#000'
    }
  }
});

function App() {
  return (
    <AuthProvider>
      <AppIntlProvider>
        <Suspense fallback={null}>
          <Router>
            <Security {...config}>
              <ThemeProvider theme={theme}>
                <Switch>
                  <Route path="/" exact={true} component={Home} />
                  <Route
                    path="/login"
                    render={() => (
                      <Login baseUrl={process.env.REACT_APP_ISSUER_OKTA} />
                    )}
                  />
                  {/* <SecureRoute path="/protected" component={Protected} /> */}
                  <Route
                    path="/implicit/callback"
                    component={ImplicitCallback}
                  />
                  <RedirectToHome default />
                  <NotFoundPage path="/not-found" />
                </Switch>
              </ThemeProvider>
            </Security>
          </Router>
        </Suspense>
      </AppIntlProvider>
    </AuthProvider>
  );
}

export default App;
