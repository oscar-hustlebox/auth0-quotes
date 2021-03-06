import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

export const opts = {
  audience: 'https://quotesapp.com/api',
  scope: 'openid profile email'
};

export const useUserQuotesApi = (url, options = {}) => {
  const { getAccessTokenSilently } = useAuth0();

  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null,
  });
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    const source = axios.CancelToken.source();

    (async () => {
      const accessToken = await getAccessTokenSilently({
        audience: opts.audience,
        scope: opts.scope
      });
      try {
        const { audience, scope, ...fetchOptions } = options;

        const results = await axios.get(url, {
          headers: {
            ...fetchOptions.headers,
            // Add the Authorization header to the existing headers
            Authorization: `Bearer ${accessToken}`,
          },
          cancelToken: source.token
        });

        setState({
          ...state,
          data: results?.data?.results ?? results?.data,
          error: null,
          loading: false,
        });
      } catch (error) {
        setState({
          ...state,
          error,
          loading: false,
        });
      }
    })();

    return () => {
      source.cancel();
    };
  }, [refreshIndex, url]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
  };
};
