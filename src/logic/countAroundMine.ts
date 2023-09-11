import { CELL_TYPE } from '../constant/Const';

const countAroundMine = ({ row, col, gameBoardData }: { row: number; col: number; gameBoardData: number[][] }) => {
  let aroundMineCount = 0;

  // 주변 셀의 좌표를 정의합니다.
  const coordinatesToCheck = [
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ];

  // 주변 셀을 검사합니다.
  for (const { x, y } of coordinatesToCheck) {
    const newRow = row + x;
    const newCol = col + y;

    // 셀이 게임 보드 내에 있는지 확인합니다.
    if (newRow >= 0 && newRow < gameBoardData.length && newCol >= 0 && newCol < gameBoardData[0].length) {
      const cellType = gameBoardData[newRow][newCol];

      // 주변 셀 중에서 지뢰 셀인 경우 카운트를 증가시킵니다.
      if ([CELL_TYPE.FLAG_MINE, CELL_TYPE.MINE, CELL_TYPE.MINECLICK, CELL_TYPE.QUESTION_MINE].includes(cellType)) {
        aroundMineCount++;
      }
    }
  }

  return aroundMineCount;
};

export default countAroundMine;
