import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export const opts = {
  audience: 'https://quotesapp.com/api',
  scope: 'openid profile email'
};

const CreateQuote = () => {
  const [text, setText] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user, getAccessTokenSilently } = useAuth0();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    const accessToken = await getAccessTokenSilently({
      audience: opts.audience,
      scope: opts.scope
    });

    e.preventDefault();
    await axios({
      method: 'post',
      url: '/api/user-quotes',
      data: {
        authorName: user.name,
        text,
        userId: user.sub
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    });

    setRedirect('/user');
  };

  const handleCancel = (returnTo) => setRedirect(returnTo);

  if (redirect) return <Redirect to={redirect} />;

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full md:w-3/6 px-4 md:mx-auto'>
        <form action='POST' onSubmit={handleSubmit}>
          <div className='flex flex-col items-center justify-between w-full mb-4'>
            <label htmlFor='quote' className='block mb-2 text-gray-700 text-xl font-bold'>
              Add Quote
            </label>
            <input
              id='quote'
              type='text'
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

export default CreateQuote;
