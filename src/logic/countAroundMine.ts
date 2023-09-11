import { CELL_TYPE } from '../constant/Const';

// 해당 함수는 x,y좌표 와 게임보드 크기를 매개변수로 받아와 주변의 cell 중에
// 몇개의 cell이 지뢰를 가지고 있는지 지뢰개수를 반환하는 함수

const countAroundMine = ({ row, col, gameBoardData }: { row: number; col: number; gameBoardData: number[][] }) => {
  let aroundMineCount = 0;

  // 주변 cell의 상대적인 좌표를 정의합니다.
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

  // coordinatesToCheck 배열의 각 요소를 순회하여 현재 cell의 좌표에다가
  // 상대적인 주변 cell의 좌표를 계산하여 새로운 좌표변수에 할당한다.
  for (const { x, y } of coordinatesToCheck) {
    const newRow = row + x;
    const newCol = col + y;

    // 새로운 좌표의 cell이 게임 보드 내에 있는지 확인합니다.
    if (newRow >= 0 && newRow < gameBoardData.length && newCol >= 0 && newCol < gameBoardData[0].length) {
      const cellType = gameBoardData[newRow][newCol];

      // 새로운 좌표의 cell이 지뢰를 가지고 있을 경우 카운트를 증가시킵니다.
      if ([CELL_TYPE.FLAG_MINE, CELL_TYPE.MINE, CELL_TYPE.MINECLICK, CELL_TYPE.QUESTION_MINE].includes(cellType)) {
        aroundMineCount++;
      }
    }
  }

  return aroundMineCount;
};

export default countAroundMine;
