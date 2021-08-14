import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import ViewHeader from './ViewHeader';
import Quotes from './Quotes';

import { useApi } from '../hooks/useApi';

const User = () => {
  const opts = {
    audience: 'https://quotesapp.com/api',
    scope: 'openid profile email'
  };

  const { loginWithRedirect, getAccessTokenWithPopup } = useAuth0();
  const { loading, error, refresh, data: quotes } = useApi(
    '/api/user-quotes',
    opts
  );

  const getTokenAndTryAgain = async () => {
    await getAccessTokenWithPopup(opts);
    refresh();
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    if (error.error === 'login_required') {
      return <button onClick={loginWithRedirect}>Login</button>;
    }
    if (error.error === 'consent_required') {
      return (
        <button onClick={getTokenAndTryAgain}>Consent to reading users</button>
      );
    }
    return <div>Oops {error.message}</div>;
  }
  return (
    <React.Fragment>
      <ViewHeader title='User Quotes' />
      <Quotes quotes={quotes} />
    </React.Fragment>
  );
};

export default User;
