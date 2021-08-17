import React, { useState, useEffect } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export const opts = {
  audience: 'https://quotesapp.com/api',
  scope: 'openid profile email'
};

const QuoteDetails = () => {
  const { pathname, quoteId } = useParams();
  const { user, getAccessTokenSilently } = useAuth0();
  const [redirect, setRedirect] = useState('');
  const history = useHistory();
  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const results = await axios.get(`/api/${pathname}-quotes/${quoteId}`);
        setState({
          ...state,
          data: results?.data?.results ?? results?.data,
          error: null,
          loading: false,
        });
      } catch (error) {
        setState({
          ...state,
          error,
          loading: false,
        });
      }
    })();
  }, []);

  const handleRemoveQuote = async (userId) => {
    if (!window.confirm(`Are you sure you want to delete ${state?.data?.text}?`)) { // eslint-disable-line no-alert
      return false;
    }

    const accessToken = await getAccessTokenSilently({
      audience: opts.audience,
      scope: opts.scope
    });

    await axios.delete(`/api/user-quotes/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    });
    setRedirect('/user');
    return null;
  };

  const renderQuoteActions = () => {
    return (
      <div className='flex items-center justify-between space-x-6 mt-6'>
        <div onClick={() => handleRemoveQuote(quoteId)} className='cursor-pointer'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='
                M19 7l-.867 12.142A2 2 0 0116.138
                21H7.862a2 2 0 01-1.995-1.858L5 7m5
                4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1
                1 0 00-1 1v3M4 7h16c
              '
            />
          </svg>
        </div>
        <Link to={`/quote/user/${quoteId}/edit`}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
              />
          </svg>
        </Link>
      </div>
    );
  };

  if (redirect) return <Redirect to={redirect} />;

  const isOwner = state?.data?.userId && (state?.data?.userId === user?.sub);

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full md:w-3/6 px-4 md:mx-auto'>
        <div className='mb-6 cursor-pointer' onClick={() => history.goBack()}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
          </svg>
        </div>
        <div
          className='
            flex flex-col md:flex-row
            items-start md:items-center
            justify-between p-6
            border rounded-md shadow-md
          '
        >
          {state?.data ? (
            <React.Fragment>
              <h5 className='text-base font-medium'>{state?.data?.text}</h5>
              <p className='text-sm font-light text-right'>{state?.data?.authorName}</p>
            </React.Fragment>
          ) : (
            <div className='flex items-center justify-center'>
              <h5 className='font-bold'>No Quote Found.</h5>
            </div>
          )}
        </div>
        {isOwner && renderQuoteActions()}
      </div>
    </div>
  );
};

export default QuoteDetails;
