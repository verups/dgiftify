import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

import Home from './pages/home';
import Login from './pages/login';

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
    <Router>
      <Security {...config}>
        <ThemeProvider theme={theme}>
          <Route path="/" exact={true} component={Home} />
          <Route
            path="/login"
            render={() => <Login baseUrl={process.env.REACT_APP_ISSUER_OKTA} />}
          />
          {/* <SecureRoute path="/protected" component={Protected} /> */}
          <Route path="/implicit/callback" component={ImplicitCallback} />
        </ThemeProvider>
      </Security>
    </Router>
  );
}

export default App;
