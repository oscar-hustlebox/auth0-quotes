import React from 'react';
import PropTypes from 'prop-types';

const ViewHeader = ({ title }) => (
  <div className='flex items-center justify-center w-full'>
    <h1 className='m-0 text-lg text-center'>{title}</h1>
  </div>
);

ViewHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default ViewHeader;
