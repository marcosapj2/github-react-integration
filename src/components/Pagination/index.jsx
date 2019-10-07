import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { Footer } from './styles';

const Pagination = ({ page, changePage }) => {
  const handlePrevious = () => {
    if (page !== 1) changePage(page - 1);
  };

  const handleNext = () => {
    changePage(page + 1);
  };
  return (
    <Footer>
      <Button disabled={page === 1} onClick={handlePrevious}>
        Anterior
      </Button>
      <span>Página {page}</span>
      <Button onClick={handleNext}>Próximo</Button>
    </Footer>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default Pagination;
