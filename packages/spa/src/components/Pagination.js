import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ quotesPerPage, totalQuotes, currentPageNumber, paginate }) => {
  /* eslint-disable no-unused-vars */
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  /* eslint-disable no-unused-vars */
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(totalQuotes / quotesPerPage); i += 1) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    return pageNumbers.map((number) => {
      if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
        return (
          <div
            key={number}
            className={`
              m-2 w-6 text-gray-700
            bg-gray-100 rounded
            hover:bg-black hover:text-white
            text-center cursor-pointer
            ${(currentPageNumber === number) && 'border-2 border-blue-500'}
          `}
            onClick={() => paginate(number)}
          >
            <span>{number}</span>
          </div>
        );
      }
      return null;
    });
  };

  const handlePrevBtn = () => {
    paginate(currentPageNumber - 1);

    if ((currentPageNumber - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit((prevState) => prevState - pageNumberLimit);
      setMinPageNumberLimit((prevState) => prevState - pageNumberLimit);
    }
  };

  const handleNextBtn = () => {
    paginate(currentPageNumber + 1);

    if (currentPageNumber + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit((prevState) => {
        return prevState + pageNumberLimit;
      });
      setMinPageNumberLimit((prevState) => {
        return prevState + pageNumberLimit;
      });
    }
  };

  let pageDecrementBtn = null;
  if (pageNumbers.length > maxPageNumberLimit) {
    pageDecrementBtn = (
      <button
        onClick={() => handlePrevBtn()}
        className='ml-2'
        disabled={currentPageNumber === pageNumbers[0]}
      >
        &hellip;
      </button>
    );
  }

  let pageIncrementBtn = null;
  if (pageNumbers.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <button
        onClick={() => handleNextBtn()}
        className='mr-2'
        disabled={currentPageNumber === pageNumbers[pageNumbers.length - 1]}
      >
        &hellip;
      </button>
    );
  }

  return (
    <div className='flex flex-wrap items-center justify-center w-full'>
      <button
        type='button'
        className='px-2 rounded bg-white hover:bg-black hover:text-white border'
        onClick={() => handlePrevBtn()}
        disabled={currentPageNumber === pageNumbers[0]}
      >
        Prev
      </button>
      {pageDecrementBtn}
      {renderPageNumbers()}
      {pageIncrementBtn}
      <button
        type='button'
        className='px-2 rounded bg-white hover:bg-black hover:text-white border'
        onClick={() => handleNextBtn()}
        disabled={currentPageNumber === pageNumbers[pageNumbers.length - 1]}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  quotesPerPage: PropTypes.number.isRequired,
  totalQuotes: PropTypes.number.isRequired,
  currentPageNumber: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
};

export default Pagination;
