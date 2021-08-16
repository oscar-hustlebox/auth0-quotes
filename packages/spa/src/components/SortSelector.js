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

const SelectOptions = ({ name, label, value, options, handleChange }) => (
  <div className='flex items-center space-x-2'>
    <label>{label}</label>
    <select
      name={name}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      className='px-4 py-2 border rounded-md'
      defaultValue={options[0]?.value}
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
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  handleChange: PropTypes.func
};

const SortSelector = ({ handleQueryOptions }) => {
  const [filterBy, setFilterBy] = React.useState('authorName');
  const [sortBy, setSortBy] = React.useState('authorName');
  const [orderBy, setOrderBy] = React.useState('asc');

  React.useEffect(() => {
    handleQueryOptions(filterBy, sortBy, orderBy);
  }, [filterBy, sortBy, orderBy]);

  const handleSubmit = (e) => e.preventDefault();

  return (
    <form onSubmit={handleSubmit} className='flex flex-row justify-between space-x-2'>
      <SelectOptions
        name='filterBy'
        label='Filter By'
        options={filterByOptions}
        value={filterBy}
        handleChange={setFilterBy}
      />
      <SelectOptions
        name='sortBy'
        label='Sort By'
        options={sortByOptions}
        value={sortBy}
        handleChange={setSortBy}
      />
      <SelectOptions
        name='orderBy'
        label='Order By'
        options={orderByOptions}
        value={orderBy}
        handleChange={setOrderBy}
      />
    </form>
  );
};

SortSelector.propTypes = {
  handleQueryOptions: PropTypes.func
};

export default SortSelector;
