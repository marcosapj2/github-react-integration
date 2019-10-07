import styled, { css } from 'styled-components';

const Button = styled.button`
  outline: none;
  border: none;
  padding: 8px;
  margin: 0 0.25rem;
  border-radius: 4px;
  ${({ disabled }) =>
    disabled &&
    css`
      background: #efefef;
    `}
  ${({ active }) =>
    active &&
    css`
      background: #576574;
      color: #fff;
    `}
`;

export default Button;
