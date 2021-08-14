import React from 'react';
import PropTypes from 'prop-types';

const ViewLayout = ({ children }) => (
  <div className='flex items-center justify-center h-screen my-0 md:my-10'>
    <div
      className='
        flex flex-col w-full md:w-3/6 h-full
        p-6 md:p-6 bg-white font-bold rounded-lg
        border shadow-0 md:shadow-lg overflow-auto
      '
    >
      {children}
    </div>
  </div>
);

ViewLayout.propTypes = {
  children: PropTypes.any
};

export default ViewLayout;
