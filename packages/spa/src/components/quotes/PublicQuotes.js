import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ViewHeader from '../ViewHeader';
import ViewLayout from '../ViewLayout';
import Quotes from './Quotes';

import { usePublicQuotesApi } from '../../hooks/usePublicQuotesApi';
import useQueryDebounce from '../../hooks/useQueryDebounce';
import SearchInput from '../SearchInput';
import SortSelector from '../SortSelector';
import useQueryParams from '../../hooks/useQueryParams';

export const opts = {
  audience: 'https://quotesapp.com/api',
  scope: 'openid profile email'
};

const PublicQuotes = () => {
  const { loginWithRedirect, getAccessTokenWithPopup } = useAuth0();
  const [query, debouncedChangeHandler] = useQueryDebounce();
  const [
    queryParams,
    filterType,
    sortType,
    orderType,
    handleFilterType,
    handleSortType,
    handleOrderType
  ] = useQueryParams(query);

  const url = `/api/public-quotes?${queryParams}`;

  const {
    loading,
    error,
    refresh,
    data: quotes,
  } = usePublicQuotesApi(url, opts);

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
    <React.Fragment>
      <div className='flex items-center justify-center mt-10 mb-6'>
        <div className='flex flex-col w-full px-6 md:p-0 md:w-3/6 h-full font-bold'>
          <div className='mb-6'>
            <SortSelector
              query={query}
              filterType={filterType}
              sortType={sortType}
              orderType={orderType}
              handleFilterType={handleFilterType}
              handleSortType={handleSortType}
              handleOrderType={handleOrderType}
            />
          </div>
          <SearchInput debouncedChangeHandler={debouncedChangeHandler} />
        </div>
      </div>
      <ViewLayout>
        <ViewHeader title='Public Quotes' />
        {loading && <div>Loading...</div>}
        {error && displayError(error.error)}
        <Quotes quotes={quotes} />
      </ViewLayout>
    </React.Fragment>
  );
};

export default PublicQuotes;
