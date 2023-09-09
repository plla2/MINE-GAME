import { CELL_TYPE } from '../constant/Const';

const countAroundMine = ({
  row,
  col,
  gameBoardData,
}: {
  row: number;
  col: number;
  gameBoardData: number[][];
}): number => {
  let aroundCells: number[] = [];
  let aroundMineCount = 0;

  // 선택한 cell의 윗줄이 있으면 윗줄에서 선택한 cell 주위의 3개의 요소를 가진 배열과 병합한다.
  aroundCells = gameBoardData[row - 1]
    ? aroundCells.concat(gameBoardData[row - 1][col - 1], gameBoardData[row - 1][col], gameBoardData[row - 1][col + 1])
    : aroundCells;

  // 선택한 cell의 같은 줄의 양 옆 2개의 요소를 가진 배열과 병합한다.
  aroundCells = aroundCells.concat(gameBoardData[row][col - 1], gameBoardData[row][col + 1]);

  // 선택한 cell의 아랫줄이 있으면 아랫줄에서 선택한 cell 주위의 3개의 요소를 가진 배열과 병합한다.
  aroundCells = gameBoardData[row + 1]
    ? aroundCells.concat(gameBoardData[row + 1][col - 1], gameBoardData[row + 1][col], gameBoardData[row + 1][col + 1])
    : aroundCells;

  // 선택한 cell의 주위cell들 중 지뢰cell인 것을 필터링하고 필터링된 배열의 길이를 구한다.
  aroundMineCount = aroundCells.filter((aroundCell) =>
    [CELL_TYPE.FLAG_MINE, CELL_TYPE.MINE, CELL_TYPE.MINECLICK, CELL_TYPE.QUESTION_MINE].includes(aroundCell),
  ).length;

  return aroundMineCount;
};

export default countAroundMine;
