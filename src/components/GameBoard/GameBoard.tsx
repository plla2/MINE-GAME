import { useAppSelector } from '../../redux/rtk-hooks/useAppSelector';
import Cell from '../Cell/Cell';

const GameBoard = () => {
  const gameBoardData = useAppSelector((state) => state.game.gameBoardData);

  return (
    <div>
      {gameBoardData.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((col, colIndex) => (
            <Cell key={rowIndex * row.length + colIndex} col={col} rowIndex={rowIndex} colIndex={colIndex} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
