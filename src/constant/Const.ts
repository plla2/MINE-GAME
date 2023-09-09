export enum CELL_TYPE {
  OPENED = 0,
  NORMAL = -1,
  QUESTION = -2,
  FLAG = -3,
  QUESTION_MINE = -4,
  FLAG_MINE = -5,
  MINE = -6,
}

export enum GAME_STATUS {
  READY = 'READY',
  PLAYING = 'PLAYING',
  WIN = 'WIN',
  LOSE = 'LOSE',
}

export const ROW = 8;
export const COL = 8;
export const MINECOUNT = 10;
