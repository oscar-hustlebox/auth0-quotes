import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ViewHeader from './ViewHeader';
import Quotes from './Quotes';

import { useApi } from '../hooks/useApi';

const PublicQuotes = () => {
  const opts = {
    audience: 'https://quotesapp.com/api',
    scope: 'openid profile email'
  };

  const { login, getAccessTokenWithPopup } = useAuth0();
  const { loading, error, refresh, data: quotes } = useApi(
    '/api/public-quotes',
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
      return <button onClick={() => login(opts)}>Login</button>;
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
      <ViewHeader title='Public Quotes' />
      <Quotes quotes={quotes} />
    </React.Fragment>
  );
};

export default PublicQuotes;
