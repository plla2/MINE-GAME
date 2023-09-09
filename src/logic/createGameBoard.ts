import { CELL_TYPE } from '../constant/Const';

// 해당 함수는 이중 반복문을 통해 매개변수로 받은 row, col값에 해당하는 길이의 2차원 배열을 반환하는 함수

const createGameBoard = ({ row, col }: { row: number; col: number }) => {
  const gameBoardData: number[][] = [];

  // 이중 반복문을 통해 내부의 반복문을 먼저 모두 마쳐야 외부의 반복문으로 넘어가게 하여,
  // 빈배열로 초기화 된 rowLineData 배열에 CELL_TYPE.NORMAL인 -1을 col개 push해주고,
  // 2차원 배열인 gameBoardData에 -1이 col개로 채워진 rowLineData배열을 push해준다.
  // 위의 과정을 row번 반복한다.
  for (let lineNumber = 0; lineNumber < row; lineNumber++) {
    const rowLineData = [];
    for (let lineElement = 0; lineElement < col; lineElement++) {
      rowLineData.push(CELL_TYPE.NORMAL);
    }
    gameBoardData.push(rowLineData);
  }
  return gameBoardData;
};

export default createGameBoard;
