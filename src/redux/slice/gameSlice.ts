import { createSlice } from '@reduxjs/toolkit';
import createGameBoard from '../../logic/createGameBoard';
import { COL, GAME_STATUS, ROW } from '../../constant/Const';
import createMinePlace from '../../logic/createMinePlace';
import settingMines from '../../logic/settingMines';

interface initialStateType {
  gameBoardData: number[][];
  status: string;
  timer: number;
}

const initialState: initialStateType = {
  gameBoardData: createGameBoard({ row: ROW, col: COL }),
  status: GAME_STATUS.READY,
  timer: 0,
};

const { actions: gameActions, reducer: gameReducer } = createSlice({
  name: 'game',
  initialState,
  reducers: {
    start: (state, action) => {
      const { row, col, mineCount } = action.payload;
      const minePlacesArr = createMinePlace({ row, col, mineCount });
      state.gameBoardData = settingMines({ col, minePlacesArr, gameBoardData: state.gameBoardData });
      state.status = GAME_STATUS.PLAYING;
    },
  },
});

export { gameActions };
export default gameReducer;
