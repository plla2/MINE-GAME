import { createSlice } from '@reduxjs/toolkit';
import createGameBoard from '../../logic/createGameBoard';
import { CELL_TYPE, COL, GAME_STATUS, ROW } from '../../constant/Const';

interface initialStateType {
  gameBoardData: number[][];
  status: string;
  timer: number;
  flagCount: number;
  isPlaying: boolean;
}

const initialState: initialStateType = {
  gameBoardData: createGameBoard({ row: ROW, col: COL }),
  status: GAME_STATUS.READY,
  timer: 0,
  flagCount: 0,
  isPlaying: false,
};

const { actions: gameActions, reducer: gameReducer } = createSlice({
  name: 'game',
  initialState,
  reducers: {
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

      if (selectCell === CELL_TYPE.NORMAL || CELL_TYPE.QUESTION) {
        state.gameBoardData[row][col] = mineCount;
      }
      if (selectCell === CELL_TYPE.MINE || CELL_TYPE.QUESTION_MINE) {
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
