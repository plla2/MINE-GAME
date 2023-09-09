import { COL, GAME_STATUS, MINECOUNT, ROW } from '../../constant/Const';
import { useAppDispatch } from '../../redux/rtk-hooks/useAppDispatch';
import { useAppSelector } from '../../redux/rtk-hooks/useAppSelector';
import { gameActions } from '../../redux/slice/gameSlice';
import Cell from '../Cell/Cell';

const GameBoard = () => {
  const gameBoardData = useAppSelector((state) => state.game.gameBoardData);
  const status = useAppSelector((state) => state.game.status);
  const dispatch = useAppDispatch();

  const onLeftMouseClick = (firstSelectPlace: number) => {
    if (status === GAME_STATUS.READY) {
      dispatch(gameActions.start({ row: ROW, col: COL, mineCount: MINECOUNT, firstSelectPlace }));
    }
  };

  return (
    <div>
      {gameBoardData.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((col, colIndex) => (
            <Cell
              key={rowIndex * row.length + colIndex}
              col={col}
              onLeftMouseClick={() => {
                onLeftMouseClick(rowIndex * row.length + colIndex);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
