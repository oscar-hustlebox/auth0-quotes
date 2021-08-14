import React from 'react';
import PropTypes from 'prop-types';

const ViewHeader = ({ title }) => (
  <div className='flex w-full mb-6'>
    <h1 className='m-0 text-lg'>{title}</h1>
  </div>
);

ViewHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default ViewHeader;
