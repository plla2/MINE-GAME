import { createSlice } from '@reduxjs/toolkit';
import createGameBoard from '../../logic/createGameBoard';
import { CELL_TYPE, GAME_STATUS } from '../../constant/Const';

interface initialStateType {
  gameBoardData: number[][];
  size: { rowCount: number; colCount: number; mineCount: number };
  status: string;
  timer: number;
  openedCount: number;
  flagCount: number;
  isPlaying: boolean;
}

const initialState: initialStateType = {
  gameBoardData: [] as number[][],
  size: { rowCount: 0, colCount: 0, mineCount: 0 },
  status: GAME_STATUS.READY,
  timer: 0,
  openedCount: 0,
  flagCount: 0,
  isPlaying: false,
};

const { actions: gameActions, reducer: gameReducer } = createSlice({
  name: 'game',
  initialState,
  reducers: {
    resizeBoard: (state, action) => {
      const { rowCount, colCount, mineCount } = action.payload;
      state.size.rowCount = rowCount;
      state.size.colCount = colCount;
      state.size.mineCount = mineCount;
      state.gameBoardData = createGameBoard({ row: rowCount, col: colCount });
      state.status = GAME_STATUS.READY;
      state.openedCount = 0;
    },

    start: (state, action) => {
      const { gameBoardData } = action.payload;
      state.gameBoardData = gameBoardData;
      state.status = GAME_STATUS.PLAYING;
      if (!state.isPlaying) {
        state.isPlaying = true;
      }
    },
    open: (state, action) => {
      const { row, col, mineCount } = action.payload;
      const selectCell = state.gameBoardData[row][col];

      if (selectCell === CELL_TYPE.NORMAL || selectCell === CELL_TYPE.QUESTION) {
        state.gameBoardData[row][col] = mineCount;
        state.openedCount++;
        if (state.size.mineCount === state.size.rowCount * state.size.colCount - state.openedCount)
          state.status = GAME_STATUS.WIN;
      }
      if (selectCell === CELL_TYPE.MINE || selectCell === CELL_TYPE.QUESTION_MINE) {
        state.gameBoardData[row][col] === CELL_TYPE.MINECLICK;
        state.status = GAME_STATUS.LOSE;
        state.isPlaying = false;
      }
    },
    updateTimer: (state): void => {
      state.timer += 1;
    },
    clickRight: (state, action) => {
      const { rowIndex, colIndex } = action.payload;

      switch (state.gameBoardData[rowIndex][colIndex]) {
        case CELL_TYPE.NORMAL: {
          state.gameBoardData[rowIndex][colIndex] = CELL_TYPE.FLAG;
          break;
        }
        case CELL_TYPE.FLAG: {
          state.gameBoardData[rowIndex][colIndex] = CELL_TYPE.QUESTION;
          break;
        }
        case CELL_TYPE.QUESTION: {
          state.gameBoardData[rowIndex][colIndex] = CELL_TYPE.NORMAL;
          break;
        }
        case CELL_TYPE.MINE: {
          state.gameBoardData[rowIndex][colIndex] = CELL_TYPE.FLAG_MINE;
          break;
        }
        case CELL_TYPE.FLAG_MINE: {
          state.gameBoardData[rowIndex][colIndex] = CELL_TYPE.QUESTION_MINE;
          break;
        }
        case CELL_TYPE.QUESTION_MINE: {
          state.gameBoardData[rowIndex][colIndex] = CELL_TYPE.MINE;
          break;
        }
        default:
          return;
      }
    },
  },
});

export { gameActions };
export default gameReducer;
