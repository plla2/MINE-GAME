// 해당 함수는 전체 cell 크기 내에서 지뢰가 들어갈 자리를 랜덤으로 만들어서 배열로 반환하는 함수

const createMinePlace = ({
  row,
  col,
  mineCount,
  firstSelectPlace,
}: {
  row: number;
  col: number;
  mineCount: number;
  firstSelectPlace: number;
}): number[] => {
  const minePlacesArr = [];

  // 빈배열로 초기화한 minePlacesArr 배열의 길이가 prop으로 받은 mineCount보다 작을 때는 계속해서,
  // 전체 cell개수보다 작은 수가 랜덤으로 minePlacesArr 배열로 push된다.

  while (minePlacesArr.length < mineCount) {
    const minePlace = Math.floor(Math.random() * row * col);

    // 랜덤으로 생성한 minePlace와 매개변수로 받아온 첫 클릭의 자리를 비교하여 같지 않을때만,
    // 지뢰자리배열에 push를 하기 때문에 첫번째 클릭이 지뢰에 걸리지 않게 된다.
    if (minePlace !== firstSelectPlace) minePlacesArr.push(minePlace);
  }
  return minePlacesArr;
};

export default createMinePlace;
