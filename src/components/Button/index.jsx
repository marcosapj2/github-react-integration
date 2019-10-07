import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from './styles';

const Button = ({ disabled, children, onClick, active, id }) => (
  <StyledButton disabled={disabled} onClick={onClick} id={id} active={active}>
    {children}
  </StyledButton>
);

Button.defaultProps = {
  active: false,
  disabled: false,
  onClick: () => null,
  id: null,
};

Button.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
export default Button;
