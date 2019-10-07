import React from 'react';
import PropTypes from 'prop-types';
import { ButtonContainer } from './styles';
import Button from '../../components/Button';

const Buttons = ({ state, setState }) => {
  return (
    <ButtonContainer>
      <Button id="all" active={state === 'all'} onClick={setState}>
        Todas
      </Button>
      <Button id="open" active={state === 'open'} onClick={setState}>
        Abertas
      </Button>
      <Button id="closed" active={state === 'closed'} onClick={setState}>
        Fechadas
      </Button>
    </ButtonContainer>
  );
};

Buttons.propTypes = {
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
};
export default Buttons;
