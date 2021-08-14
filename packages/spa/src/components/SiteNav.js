import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const SiteNav = () => {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  return (
    <nav className='flex items-center justify-between bg-red-500 p-6'>
      <div className='flex flex-grow-1'>
        <Link to='/' className='font-semibold text-xl text-white tracking-tight'>Quotes App</Link>
      </div>
      <React.Fragment>
        {error && <div className='text-white'>{error.message}</div>}
        {isLoading && <div className='text-white'>Loading...</div>}
        {!isLoading && isAuthenticated && (
          <div className='flex items-center'>
            <Link to='/user'>
              <img
                className='inline object-cover w-8 h-8 mr-2 rounded-full'
                src={user.picture}
                alt='Profile image'
              />
            </Link>
            <button className='text-white' onClick={() => logout({ returnTo: window.location.origin })}>
              Log out
            </button>
          </div>
        )}
        {!isLoading && !isAuthenticated && <button className='text-white' onClick={loginWithRedirect}>Log in</button>}
      </React.Fragment>
    </nav>
  );
};

export default SiteNav;
