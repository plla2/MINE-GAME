import { CELL_TYPE } from '../constant/Const';

// createMinePlace 함수에서 받아온 지뢰를 생성할 랜덤한 위치를 이용하여 지뢰를 심은 게임보드를 생성한다.

const createGameBoard = (row: number, col: number, minePlacesArr: number[]) => {
  // gameBoardData는 number[]타입으로 된 요소들을 가진 2차원 배열로 이루어져 있다.
  const gameBoardData: number[][] = [];

  // 이중 반복문을 통해 내부의 반복문을 먼저 모두 마쳐야 외부의 반복문으로 넘어가게 하여
  // rowLineData 배열에 CELL_TYPE.NORMAL인 -1을 col개 push해주고,
  // 2차원 배열인 gameBoardData에 -1이 10개로 채워진 rowLineData배열을 push해준다.
  // 위의 과정을 row번 반복한다.
  for (let lineNumber = 0; lineNumber < row; lineNumber++) {
    const rowLineData = [];
    for (let lineElement = 0; lineElement < col; lineElement++) {
      rowLineData.push(CELL_TYPE.NORMAL);
    }
    gameBoardData.push(rowLineData);
  }

  // 20~26번을 통해 만들어진 2차원 배열 gameBoardData에 createMinePlace함수에서 만들어진 전체cell의 개수 내에서의 랜덤한 수들을
  // 2차원 배열에 각각 가로, 세로 갯수로 나눈 값을 index로 각각 넣어준다.
  minePlacesArr.forEach((place) => {
    const vertical = Math.floor(place / col);
    const horizontal = Math.floor(place / row);
    gameBoardData[vertical][horizontal] = CELL_TYPE.MINE;
  });
  return gameBoardData;
};

export default createGameBoard;
