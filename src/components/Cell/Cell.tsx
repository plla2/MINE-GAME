import * as S from './CellStyle';

const Cell = ({ col }: { col: number }) => {
  return <S.CellTd>{col}</S.CellTd>;
};

export default Cell;
