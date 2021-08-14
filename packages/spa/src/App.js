import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import { createBrowserHistory } from 'history';

import SiteNav from './components/SiteNav';
import ViewLayout from './components/ViewLayout';
import PublicQuotes from './components/PublicQuotes';
import User from './components/User';

export const history = createBrowserHistory();

const onRedirectCallback = (appState) => {
  // Use the router's history module to replace the url
  history.replace(appState?.returnTo || window.location.pathname);
};

const ProtectedRoute = ({ component, ...args }) => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);

ProtectedRoute.propTypes = {
  component: PropTypes.any
};

const App = () => {
  return (
    <Auth0Provider
      domain='dev-v5k0yq0h.us.auth0.com'
      clientId='b8dxjf5g5lfHhRfyksO63Ct2t522TEvB'
      redirectUri={window.location.origin}
      onRedirect={onRedirectCallback}
    >
      <Router history={history}>
        <SiteNav />
        <ViewLayout>
          <Switch>
            <Route path='/' exact component={PublicQuotes} />
            <ProtectedRoute path='/user' component={User} />
          </Switch>
        </ViewLayout>
      </Router>
    </Auth0Provider>
  );
};

export default App;
