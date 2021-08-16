import React, { useState } from 'react';

// TODO Improve readability
const useQueryOptions = (query) => {
  const [queryParams, setQueryParams] = useState();

  const filterByParams = queryParams?.text ?? queryParams?.authorName; // text || authorName
  const sortByParams = queryParams?.sortBy && `sortBy=${queryParams.sortBy}`;

  const params = `${filterByParams}=${query}&${sortByParams}`;

  const handleQueryOptions = (filterBy, sortBy, orderBy) => {
    const formValues = {
      ...filterBy === 'text' && {
        text: filterBy
      },
      ...filterBy === 'authorName' && {
        authorName: filterBy
      },
      ...sortBy && {
        sortBy: orderBy === 'desc' ? `${'-'}${sortBy}` : sortBy
      }
    };
    setQueryParams(formValues);
  };

  return [params, handleQueryOptions];
};

export default useQueryOptions;
