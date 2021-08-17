import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Quotes = ({ user, quotes }) => (
  (quotes || []).map(({ id, text, authorName, userId }) => (
    <div
      key={id}
      className='flex flex-row items-center justify-between py-6 border-b-2'
    >
      <div className='flex space-x-2 items-start justify-start'>
        {userId && (userId === user?.sub) && <div className='w-2 h-2 bg-green-400 rounded-full mt-2'></div>}
        <div className='flex flex-col items-start'>
          <h5 className='text-base font-medium'>{text}</h5>
          <p className='text-sm font-light text-right'>{authorName}</p>
        </div>
      </div>
      <Link to={`/quote/${userId ? 'user' : 'public'}/${id}`} className='shadow rounded-full p-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
        </svg>
      </Link>
    </div>
  ))
);

Quotes.propTypes = {
  user: PropTypes.object,
  quotes: PropTypes.array
};

export default Quotes;
