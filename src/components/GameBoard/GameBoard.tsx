import createGameBoard from '../../logic/createGameBoard';
import createMinePlace from '../../logic/createMinePlace';
import settingMines from '../../logic/settingMines';
import Cell from '../Cell/Cell';

const GameBoard = () => {
  const row = 10;
  const col = 10;
  const mineCount = 10;

  const minePlacesArr = createMinePlace({ row, col, mineCount });
  const gameBoardData = createGameBoard({ row, col });
  const setMineBoardData = settingMines({ col, minePlacesArr, gameBoardData });

  console.log('minePlacesArr : ', minePlacesArr);
  console.log('boardData : ', gameBoardData);

  return (
    <table>
      <tbody>
        {setMineBoardData.map((row, index) => (
          <tr key={index}>
            {row.map((col, index) => (
              <Cell key={index} col={col} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GameBoard;
