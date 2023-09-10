import styled from 'styled-components';

export const CellButton = styled.button<{ isOpen: boolean }>`
  width: 30px;
  height: 30px;
  border: 1px solid #a7727d;
  background-color: ${({ isOpen }) => (isOpen ? '#FEFAE0' : '#FAEDCD')};
  text-align: center;
  font-weight: 700;
  color: #8b7e74;
`;
