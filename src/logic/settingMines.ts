import { CELL_TYPE } from '../constant/Const';

// 해당 함수는 createMinePlace에서 받아온 랜덤한 값을 가진 요소들이 있는 배열을 이용하여 지뢰들을 좌표에 설정한 2차원 배열을 반환하는 함수

const settingMines = ({
  col,
  minePlacesArr,
  gameBoardData,
}: {
  col: number;
  minePlacesArr: number[];
  gameBoardData: number[][];
}): number[][] => {
  // newGameBoard라는 변수에 매개변수로 가져온 gameBoardData를 깊은 복사하여,
  // 새로운 2차원 배열을 만들어 수정함으로써 데이터 무결성을 유지할 수 있다.
  const newGameBoard = gameBoardData.map((row) => [...row]);

  // createMinePlace함수에서 만들어진 전체cell의 개수 내에서의 랜덤한 숫자를 mineCount개 가진
  // 배열 minePlaceArr의 요소들을 각각 col로 나눈 값과 나머지를 x,y좌표에 각각 넣어주고, 지뢰cell로 지정한다.
  minePlacesArr.forEach((place) => {
    const vertical = Math.floor(place / col);
    const horizontal = place % col;
    newGameBoard[vertical][horizontal] = CELL_TYPE.MINE;
  });
  return newGameBoard;
};
export default settingMines;
