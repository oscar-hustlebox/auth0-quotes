import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Quotes = ({ quotes }) => (
  (quotes || []).map(({ id, text, authorName, userId }) => (
    <Link
      key={id}
      to={`/quote/${userId ? 'user' : 'public'}/${id}`}
      className='flex flex-col md:flex-row items-start md:items-center justify-between py-6 border-b-2'
    >
      <h5 className='text-base font-medium'>{text}</h5>
      <p className='text-sm font-light text-right'>{authorName}</p>
    </Link>
  ))
);

Quotes.propTypes = {
  quotes: PropTypes.array.isRequired
};

export default Quotes;
