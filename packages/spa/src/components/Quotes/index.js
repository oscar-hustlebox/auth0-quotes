import React from 'react';
import PropTypes from 'prop-types';

const Quotes = ({ quotes }) => {
  return (quotes || []).map(({ id, text, authorName }) => (
    <div key={id} className='flex flex-col md:flex-row items-start md:items-center justify-between py-6 border-b-2'>
      <h5 className='text-base font-medium'>{text}</h5>
      <p className='text-sm font-light text-right'>{authorName}</p>
    </div>
  ));
};

Quotes.propTypes = {
  quotes: PropTypes.array.isRequired
};

export default Quotes;
