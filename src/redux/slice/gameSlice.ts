import { createSlice } from '@reduxjs/toolkit';
import createGameBoard from '../../logic/createGameBoard';
import { CELL_TYPE, COL, GAME_STATUS, ROW } from '../../constant/Const';

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
      const { gameBoardData } = action.payload;
      state.gameBoardData = gameBoardData;
      state.status = GAME_STATUS.PLAYING;
    },
    open: (state, action) => {
      const { row, col } = action.payload;
      const selectCell = state.gameBoardData[row][col];

      if (selectCell === CELL_TYPE.NORMAL || CELL_TYPE.QUESTION) {
        state.gameBoardData[row][col] = CELL_TYPE.OPENED;
      }
      if (selectCell === CELL_TYPE.MINE || CELL_TYPE.QUESTION_MINE) {
        state.gameBoardData[row][col] === CELL_TYPE.MINECLICK;
        state.status = GAME_STATUS.LOSE;
      }
    },
  },
});

export { gameActions };
export default gameReducer;
