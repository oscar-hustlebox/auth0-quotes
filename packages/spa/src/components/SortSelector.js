import React from 'react';
import PropTypes from 'prop-types';

const filterByOptions = [{
  id: '1',
  value: 'authorName',
  label: 'Author Name'
}, {
  id: '2',
  value: 'text',
  label: 'Text'
}];

const sortByOptions = [{
  id: '1',
  value: 'authorName',
  label: 'Author Name'
}, {
  id: '2',
  value: 'text',
  label: 'Text'
}];

const orderByOptions = [{
  id: '1',
  value: 'asc',
  label: 'Ascending'
}, {
  id: '2',
  value: 'desc',
  label: 'Descending'
}];

const SelectOptions = ({ isDisabled, name, label, value, options, handleChange }) => (
  <div className='flex items-center space-x-2'>
    <label className={isDisabled ? 'text-gray-300' : null}>{label}</label>
    <select
      name={name}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      className={`px-4 py-2 border rounded-md ${isDisabled ? 'bg-gray-100 text-gray-300' : null}`}
      disabled={isDisabled}
    >
      {(options || []).map((opt) => (
        <option key={opt.id} value={opt.value}>
          {opt.label}
        </option>
      ))};
    </select>
  </div>
);

SelectOptions.propTypes = {
  isDisabled: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  handleChange: PropTypes.func
};

const SortSelector = ({
  query,
  filterType,
  sortType,
  orderType,
  handleFilterType,
  handleSortType,
  handleOrderType
}) => {
  const handleSubmit = (e) => e.preventDefault();

  return (
    <form onSubmit={handleSubmit} className='flex flex-row justify-between space-x-2'>
      <SelectOptions
        name='filterBy'
        label='Filter By'
        options={filterByOptions}
        value={filterType}
        isDisabled={!query}
        handleChange={handleFilterType}
      />
      <SelectOptions
        name='sortBy'
        label='Sort By'
        options={sortByOptions}
        value={sortType}
        isDisabled={!query}
        handleChange={handleSortType}
      />
      <SelectOptions
        name='orderBy'
        label='Order By'
        options={orderByOptions}
        value={orderType}
        isDisabled={!query}
        handleChange={handleOrderType}
      />
    </form>
  );
};

SortSelector.propTypes = {
  query: PropTypes.string,
  filterType: PropTypes.string,
  sortType: PropTypes.string,
  orderType: PropTypes.string,
  handleFilterType: PropTypes.func,
  handleSortType: PropTypes.func,
  handleOrderType: PropTypes.func,
};

export default SortSelector;
