import React from 'react';
import PropTypes from 'prop-types';

const ViewLayout = ({ children }) => (
  <div className='flex items-center justify-center h-screen'>
    <div className='w-3/6 bg-white font-bold rounded-lg border shadow-lg p-10'>
      {children}
    </div>
  </div>
);

ViewLayout.propTypes = {
  children: PropTypes.any
};

export default ViewLayout;
