import createGameBoard from '../../logic/createGameBoard';
import createMinePlace from '../../logic/createMinePlace';
import Cell from '../Cell/Cell';

const GameBoard = () => {
  const row = 10;
  const col = 10;
  const mineCount = 10;

  const minePlacesArr = createMinePlace(row, col, mineCount);
  const boardData = createGameBoard(row, col, minePlacesArr);
  console.log('minePlacesArr : ', minePlacesArr);
  console.log('boardData : ', boardData);
  return (
    <>
      {boardData.map((row, index) => (
        <tr key={index}>
          {row.map((col, index) => (
            <Cell key={index} col={col} />
          ))}
        </tr>
      ))}
    </>
  );
};

export default GameBoard;
