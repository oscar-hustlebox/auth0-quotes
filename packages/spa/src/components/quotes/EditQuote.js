import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export const opts = {
  audience: 'https://quotesapp.com/api',
  scope: 'openid profile email'
};

const EditQuote = ({ quoteId, redirectTo }) => {
  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null,
  });
  const [redirect, setRedirect] = useState('');
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: opts.audience,
          scope: opts.scope
        });
        const results = await axios.get(`/api/user-quotes/${quoteId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
        });

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
  }, [quoteId]);

  const handleChange = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          text: e.target.value
        }
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = await getAccessTokenSilently({
      audience: opts.audience,
      scope: opts.scope
    });

    await axios({
      method: 'patch',
      url: `/api/user-quotes/${quoteId}`,
      data: {
        authorName: state?.data?.authorName,
        text: state?.data?.text,
        userId: state?.data?.userId
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    });

    setRedirect(redirectTo);
  };

  const handleCancel = (returnTo) => setRedirect(returnTo);

  if (redirect) return <Redirect to={redirect} />;

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full md:w-3/6 px-4 md:mx-auto'>
        <form action='POST' onSubmit={handleSubmit}>
          <div className='flex flex-col items-center justify-between w-full mb-4'>
            <label htmlFor='quote' className='block mb-2 text-gray-700 text-xl font-bold'>
              Edit Quote
            </label>
            <input
              id='quote'
              type='text'
              value={state?.data?.text}
              placeholder='Quote Input'
              onChange={handleChange}
              className='
                w-full py-2 px-3
                border rounded shadow
                text-gray-700 leading-tight
              '
            />
          </div>

          <div className='flex items-center justify-between w-full mb-4'>
            <button onClick={() => handleCancel('/user')}>Cancel</button>
            <button type='submit' className='py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded text-white font-bold'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditQuote.propTypes = {
  quoteId: PropTypes.string.isRequired,
  redirectTo: PropTypes.string.isRequired
};

export default EditQuote;
