import * as S from './GameBoardStyle';
import { useAppSelector } from '../../redux/rtk-hooks/useAppSelector';
import Cell from '../Cell/Cell';

const GameBoard = () => {
  const gameBoardData = useAppSelector((state) => state.game.gameBoardData);

  return (
    <S.BoardWrapper>
      {gameBoardData.map((row, rowIndex) => (
        <S.RowWrapper key={rowIndex}>
          {row.map((col, colIndex) => (
            <Cell key={rowIndex * row.length + colIndex} col={col} rowIndex={rowIndex} colIndex={colIndex} />
          ))}
        </S.RowWrapper>
      ))}
    </S.BoardWrapper>
  );
};

export default GameBoard;
