import { useEffect, useState } from 'react';
import axios from 'axios';

export const usePublicQuotesApi = (url, options = {}) => {
  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null,
  });
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    const source = axios.CancelToken.source();

    (async () => {
      try {
        const { audience, scope, ...fetchOptions } = options;

        const results = await axios.get(url, {
          headers: {
            ...fetchOptions.headers
          },
          cancelToken: source.token
        });

        setState({
          ...state,
          data: results?.data?.results,
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
  }, []);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
  };
};
