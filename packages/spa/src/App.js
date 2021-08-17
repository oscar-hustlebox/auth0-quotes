import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import { createBrowserHistory } from 'history';

import SiteNav from './components/SiteNav';
import PublicQuotes from './components/quotes/PublicQuotes';
import CreateQuote from './components/quotes/CreateQuote';
import EditQuote from './components/quotes/EditQuote';
import QuoteDetails from './components/quotes/QuoteDetails';
import UserQuotes from './components/quotes/UserQuotes';

export const history = createBrowserHistory();

const NotFound = () => (
  <div className='flex items-center justify-center h-screen'>
    <div className='w-full md:w-3/6 px-4 md:mx-auto'>
      <div className='text-center'>Page Not Found</div>
    </div>
  </div>
);

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
        <Switch>
          <Route path='/' exact component={PublicQuotes} />
          <ProtectedRoute path='/user' component={UserQuotes} />
          <ProtectedRoute path='/quote/create' exact component={CreateQuote} />
          <Route path='/quote/:pathname/:quoteId' exact component={QuoteDetails} />
          <ProtectedRoute
            path={`/quote/:pathname/:quoteId/edit`}
            exact
            component={({ match }) => (
              <EditQuote
                quoteId={match.params.quoteId}
                redirectTo={`/user`}
              />
            )}
            />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Auth0Provider>
  );
};

export default App;
