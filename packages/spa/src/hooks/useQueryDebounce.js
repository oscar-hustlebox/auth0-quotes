import { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

const useQueryDebounce = () => {
  const [query, setQuery] = useState('');

  const handleQueryChange = (value) => setQuery(encodeURIComponent(value));

  const debouncedQueryHandler = useMemo(
    () => debounce(handleQueryChange, 750),
    [query]);

  useEffect(() => {
    // Cleanup Function - Stop the invocation of the debounced function
    return () => {
      // lodash.debounce provides debouncedCallback.cancel() to cancel any scheduled calls.
      debouncedQueryHandler.cancel();
    };
  }, []);

  return [query, debouncedQueryHandler];
};

export default useQueryDebounce;
