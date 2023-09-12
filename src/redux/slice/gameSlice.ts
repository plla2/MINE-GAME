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
      // 해당 리듀서는 게임 보드 크기를 조정하고, 기타 상태들을 초기화하는 액션을 처리한다.
      const { rowCount, colCount, mineCount } = action.payload;
      state.size.rowCount = rowCount;
      state.size.colCount = colCount;
      state.size.mineCount = mineCount;
      state.gameBoardData = createGameBoard({ row: rowCount, col: colCount });
      state.status = GAME_STATUS.READY;
      state.openedCount = 0;
      state.timer = 0;
      state.isPlaying = false;
    },

    start: (state, action) => {
      // 해당 리듀서는 게임 보드 데이터를 설정하는 액션을 처리한다.
      const { gameBoardData } = action.payload;
      state.gameBoardData = gameBoardData;
      state.status = GAME_STATUS.PLAYING;
    },
    open: (state, action) => {
      // 해당 리듀서는 cell을 열면서 게임상태와 게임보드를 업데이트하고,
      // 이긴경우, 진경우에 대한 액션을 처리한다.
      const { row, col, mineCount } = action.payload;
      const selectCell = state.gameBoardData[row][col];

      if (!state.isPlaying) {
        state.isPlaying = true;
      }

      if (selectCell === CELL_TYPE.NORMAL || selectCell === CELL_TYPE.QUESTION) {
        state.gameBoardData[row][col] = mineCount;
        state.openedCount++;
        if (state.size.mineCount === state.size.rowCount * state.size.colCount - state.openedCount) {
          state.status = GAME_STATUS.WIN;
          state.isPlaying = false;
          alert('승리하셨습니다! 레벨을 올려 도전해보세요!!');
        }
      }
      if (selectCell === CELL_TYPE.MINE || selectCell === CELL_TYPE.QUESTION_MINE) {
        state.gameBoardData[row][col] = CELL_TYPE.MINECLICK;
        state.status = GAME_STATUS.LOSE;
        state.isPlaying = false;
      }
    },
    updateTimer: (state): void => {
      state.timer += 1;
    },
    clickRight: (state, action) => {
      // 해당 리듀서는 마우스 오른쪽 버튼을 클릭하여 cell에 깃발, 물음표, 일반 표시를 하는 액션을 처리한다.
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
