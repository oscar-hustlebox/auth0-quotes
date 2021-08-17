import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({ placeholder, debouncedChangeHandler }) => {
  const handleSubmit = (e) => e.preventDefault();
  return (
    <form onSubmit={handleSubmit} className='flex w-full'>
      <input
        id='SearchInput'
        className='
          w-full pl-2 p-3 outline-none focus:outline-none
          focus:ring-2 focus:ring-black bg-white border-2 rounded-lg
        '
        type='text'
        name='q'
        placeholder={placeholder ?? 'Search'}
        autoFocus
        onChange={(e) => debouncedChangeHandler(e.target.value)}
      />
    </form>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  debouncedChangeHandler: PropTypes.func
};

export default SearchInput;
