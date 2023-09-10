import styled from 'styled-components';

export const BoardWrapper = styled.div`
  border: 5px solid ${({ theme }) => theme.color.board_border};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  box-shadow: ${({ theme }) => theme.shadow.box_shadow};
  margin-bottom: 20px;
`;

export const RowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
