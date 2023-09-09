import * as S from './CellStyle';

const Cell = ({ col, onLeftMouseClick }: { col: number; onLeftMouseClick: () => void }) => {
  return <S.CellButton onClick={onLeftMouseClick}>{col}</S.CellButton>;
};

export default Cell;
