import styled from 'styled-components';

export const CellButton = styled.button<{ isOpen: boolean; disabled: boolean; isBomb: boolean }>`
  width: 30px;
  height: 30px;
  border: 1px solid #a7727d;
  background-color: ${({ isOpen }) => (isOpen ? '#F8EDE3' : '#DFD3C3')};
  text-align: center;
  font-weight: 700;
  color: #8b7e74;
`;
