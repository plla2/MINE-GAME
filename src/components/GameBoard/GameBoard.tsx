import { COL, GAME_STATUS, MINECOUNT, ROW } from '../../constant/Const';
import { useAppDispatch } from '../../redux/rtk-hooks/useAppDispatch';
import { useAppSelector } from '../../redux/rtk-hooks/useAppSelector';
import { gameActions } from '../../redux/slice/gameSlice';
import Cell from '../Cell/Cell';

const GameBoard = () => {
  const gameBoardData = useAppSelector((state) => state.game.gameBoardData);
  const status = useAppSelector((state) => state.game.status);
  const dispatch = useAppDispatch();

  const onLeftMouseClick = () => {
    if (status === GAME_STATUS.READY) {
      dispatch(gameActions.start({ row: ROW, col: COL, mineCount: MINECOUNT }));
    }
  };

  return (
    <table>
      <tbody>
        {gameBoardData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((col, ColIndex) => (
              <Cell key={rowIndex * row.length + ColIndex} col={col} onLeftMouseClick={onLeftMouseClick} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GameBoard;
