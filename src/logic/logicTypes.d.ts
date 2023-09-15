export interface countAroudMineTypes {
  row: number;
  col: number;
  gameBoardData: number[][];
}

export interface createGameBoardTypes {
  row: number;
  col: number;
}

export interface createMinePlaceTypes {
  row: number;
  col: number;
  mineCount: number;
  firstSelectPlace: number;
}

export interface settingMines {
  col: number;
  minePlacesArr: number[];
  gameBoardData: number[][];
}
