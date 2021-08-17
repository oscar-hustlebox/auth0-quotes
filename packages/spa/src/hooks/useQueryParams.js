import { useState, useEffect } from 'react';

const getOrderType = (sort, order) => (order !== 'asc' ? `${'-'}${sort}` : sort);

const useQueryParams = (query) => {
  const [queryParams, setQueryParams] = useState();
  const [filterType, setFilterType] = useState('authorName');
  const [sortType, setSortType] = useState('authorName');
  const [orderType, setOrderType] = useState('asc');

  useEffect(() => {
    let qp = '';
    if (query) qp = `${filterType}=${query}&sortBy=${getOrderType(sortType, orderType)}`;
    setQueryParams(qp);
  }, [query, filterType, sortType, orderType]);

  const handleFilterType = (filter) => {
    setFilterType(filter);
  };
  const handleSortType = (sort) => {
    setSortType(sort);
  };
  const handleOrderType = (order) => {
    setOrderType(order);
  };

  return [
    queryParams,
    filterType,
    sortType,
    orderType,
    handleFilterType,
    handleSortType,
    handleOrderType
  ];
};

export default useQueryParams;
