import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ViewHeader from '../ViewHeader';
import ViewLayout from '../ViewLayout';
import Quotes from './Quotes';

import { usePublicQuotesApi } from '../../hooks/usePublicQuotesApi';

export const opts = {
  audience: 'https://quotesapp.com/api',
  scope: 'openid profile email'
};

const PublicQuotes = () => {
  const { loginWithRedirect, getAccessTokenWithPopup } = useAuth0();
  const { loading, error, refresh, data: quotes } = usePublicQuotesApi(
    '/api/public-quotes',
    opts
  );

  const getTokenAndTryAgain = async () => {
    await getAccessTokenWithPopup(opts);
    refresh();
  };

  const displayError = (type) => {
    switch (type) {
      case 'login_required':
        return <button onClick={loginWithRedirect}>Login</button>;
      case 'consent_required':
        return <button onClick={getTokenAndTryAgain}>Consent to reading users</button>;
      default:
        return <div>Oops {error.message}</div>;
    }
  };

  return (
    <ViewLayout>
      <ViewHeader title='Public Quotes' />
      {loading && <div>Loading...</div>}
      {error && displayError(error.error)}
      <Quotes quotes={quotes} />
    </ViewLayout>
  );
};

export default PublicQuotes;
