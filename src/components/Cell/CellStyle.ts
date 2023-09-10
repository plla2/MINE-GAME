import styled from 'styled-components';

export const CellButton = styled.button<{ $isOpen: boolean; $isBomb: boolean }>`
  width: 30px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.color.cell_border};
  background-color: ${({ $isOpen, $isBomb, theme }) =>
    $isOpen ? theme.color.cell_open : $isBomb ? theme.color.red_color : theme.color.cell_normal};
  text-align: center;
  font-weight: 700;
  color: ${({ theme }) => theme.color.font_color};
  font-size: 18px;
  &:disabled {
    opacity: 0.4;
  }
`;
