import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import ViewHeader from '../ViewHeader';
import ViewLayout from '../ViewLayout';
import Quotes from './Quotes';

import { useUserQuotesApi } from '../../hooks/useUserQuotesApi';
import SearchInput from '../SearchInput';
import useQueryDebounce from '../../hooks/useQueryDebounce';

export const opts = {
  audience: 'https://quotesapp.com/api',
  scope: 'openid profile email'
};

const UserQuotes = () => {
  const { loginWithRedirect, getAccessTokenWithPopup } = useAuth0();
  const [query, debouncedChangeHandler] = useQueryDebounce();

  const url = `/api/user-quotes?userId=${query}`;

  const { loading, error, refresh, data: quotes } = useUserQuotesApi(url, opts);

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
      <ViewHeader title='User Quotes'>
        <Link to='/quote/create' className='bg-blue-500 hover:bg-blue-900 rounded-md text-white p-4'>
          Create Quote
        </Link>
      </ViewHeader>
      <SearchInput debouncedChangeHandler={debouncedChangeHandler} />
      {loading && <div>Loading...</div>}
      {error && displayError(error.error)}
      <Quotes quotes={quotes} />
    </ViewLayout>
  );
};

export default UserQuotes;
