import React from 'react';
import PropTypes from 'prop-types';

const ViewHeader = ({ title, children }) => (
  <div className='flex items-center justify-between w-full mt-2 pb-6 border-b-2'>
    <h1 className='m-0 text-lg'>{title}</h1>
    {children && (
      <div>
        {children}
      </div>
    )}
  </div>
);

ViewHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default ViewHeader;
