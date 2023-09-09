import { useState } from 'react';
import { CELL_TYPE, COL, GAME_STATUS, TOTALMINECOUNT, ROW } from '../../constant/Const';
import createMinePlace from '../../logic/createMinePlace';
import { useAppDispatch } from '../../redux/rtk-hooks/useAppDispatch';
import { useAppSelector } from '../../redux/rtk-hooks/useAppSelector';
import * as S from './CellStyle';
import settingMines from '../../logic/settingMines';
import { gameActions } from '../../redux/slice/gameSlice';
import countAroundMine from '../../logic/countAroundMine';

const Cell = ({ col, colIndex, rowIndex }: { col: number; rowIndex: number; colIndex: number }) => {
  const dispatch = useAppDispatch();
  const [aroundMineCount, setAroundMineCount] = useState<number>();
  const status = useAppSelector((state) => state.game.status);
  const gameBoardData = useAppSelector((state) => state.game.gameBoardData);

  const clickLeftMouse = (firstSelectPlace: number) => {
    // 이번 클릭이 처음 클릭일 경우
    if (status === GAME_STATUS.READY) {
      const minePlacesArr = createMinePlace({
        row: ROW,
        col: COL,
        mineCount: TOTALMINECOUNT,
        firstSelectPlace,
      });
      const startingBoard = settingMines({
        col: COL,
        minePlacesArr,
        gameBoardData,
      });
      dispatch(gameActions.start({ gameBoardData: startingBoard }));
      setAroundMineCount(countAroundMine({ row: rowIndex, col: colIndex, gameBoardData: startingBoard }));
      dispatch(gameActions.open({ row: rowIndex, col: colIndex }));
    } else {
      // 이번 클릭이 첫클릭이 아닐 경우

      if (col === CELL_TYPE.NORMAL) {
        setAroundMineCount(countAroundMine({ row: rowIndex, col: colIndex, gameBoardData }));
        dispatch(gameActions.open({ row: rowIndex, col: colIndex }));
      }
      if (col === CELL_TYPE.MINE) {
        dispatch(gameActions.open({ row: rowIndex, col: colIndex }));
      }
    }
  };

  return (
    <S.CellButton
      onClick={() => {
        clickLeftMouse(COL * rowIndex + colIndex);
      }}
    >
      {col === CELL_TYPE.OPENED ? aroundMineCount : null}
      {col === CELL_TYPE.MINECLICK ? '뢰' : null}
      {col === CELL_TYPE.NORMAL ? '' : null}
    </S.CellButton>
  );
};

export default Cell;
