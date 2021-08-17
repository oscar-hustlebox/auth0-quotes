import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ViewHeader from '../ViewHeader';
import ViewLayout from '../ViewLayout';
import Quotes from './Quotes';
import EmptyQuotes from './EmptyQuotes';

import SearchInput from '../SearchInput';
import SortSelector from '../SortSelector';
import Pagination from '../Pagination';

import { usePublicQuotesApi } from '../../hooks/usePublicQuotesApi';
import useQueryDebounce from '../../hooks/useQueryDebounce';
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

  const [pageNumber, setPageNumber] = useState(0);
  const paginate = (number) => setPageNumber(number);

  React.useEffect(() => {
    paginate(0);
  }, [queryParams]);

  const url = `/api/public-quotes?${queryParams}&start=${pageNumber}`;

  const {
    loading,
    error,
    refresh,
    data: quotes,
    quotesPerPage,
    currentPageNumber,
    quotesTotal
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
        return <div className='flex items-center justify-center mx-auto h-screen'>Oops {error.message}</div>;
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
          <SearchInput placeholder='Search by Author Name or by Text' debouncedChangeHandler={debouncedChangeHandler} />
        </div>
      </div>
      <ViewLayout>
        <ViewHeader title='Public Quotes' />
        {loading && <div className='flex items-center justify-center mx-auto h-screen'>Loading...</div>}
        {error && displayError(error.error)}
        <Quotes quotes={quotes} />
        {!loading && (Array.isArray(quotes) && !quotes?.length) && (
          <EmptyQuotes />
        )}
      </ViewLayout>
      {quotes && (
        <div className='flex items-center justify-center mt-10 mb-6'>
          <div className='flex flex-col w-full px-6 md:p-0 md:w-3/6 h-full font-bold'>
            <Pagination
              quotesPerPage={quotesPerPage}
              totalQuotes={quotesTotal}
              currentPageNumber={currentPageNumber}
              paginate={paginate}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default PublicQuotes;
