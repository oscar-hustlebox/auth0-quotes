import React, { useState, useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
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
  };

  if (redirect) return <Redirect to={redirect} />;

  const isOwner = state?.data?.userId && (state?.data?.userId === user?.sub);

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='sm:container px-4 md:mx-auto'>
        {isOwner && (
          <div className='mb-6 text-right'>
            <Link to={`/quote/user/${quoteId}/edit`} className=''>
              Edit Quote
            </Link>
          </div>
        )}
          <div
            className='
              flex flex-col md:flex-row
              items-start md:items-center
              justify-between p-6 w-full
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
        {isOwner && (
          <div className='mt-6 text-right'><div onClick={() => handleRemoveQuote(quoteId)}>Remove Quote</div></div>
        )}
      </div>
    </div>
  );
};

export default QuoteDetails;
