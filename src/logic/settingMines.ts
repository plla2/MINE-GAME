import { CELL_TYPE } from '../constant/Const';

// 해당 함수는 createMinePlace에서 받아온 랜덤한 값을 가진 배열을 이용하여 지뢰를 각 자리에 설정한 2차원 배열을 반환하는 함수

const settingMines = ({
  col,
  minePlacesArr,
  gameBoardData,
}: {
  col: number;
  minePlacesArr: number[];
  gameBoardData: number[][];
}): number[][] => {
  // createGameBoard 함수를 통해 만들어진 2차원 배열 gameBoardData에 createMinePlace함수에서 만들어진
  // 전체cell의 개수 내에서의 랜덤한 숫자 mineCount개를 각각 col로 나눈 값과 나머지를 index로 각각 넣어준다.

  minePlacesArr.forEach((place) => {
    const vertical = Math.floor(place / col);
    const horizontal = Math.ceil(place % col);
    gameBoardData[vertical][horizontal] = CELL_TYPE.MINE;
  });
  return gameBoardData;
};
export default settingMines;
