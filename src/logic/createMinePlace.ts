const createMinePlace = (row: number, col: number, mineCount: number): number[] => {
  const minePlacesArr = [];

  // 빈배열로 초기화한 minePlacesArr 배열의 길이가 prop으로 받은 mineCount보다 작을때
  // 전체 cell개수보다 작은 수가 랜덤으로 minePlacesArr 배열로 push된다.

  while (minePlacesArr.length < mineCount) {
    const minePlace = Math.floor(Math.random() * row * col);
    minePlacesArr.push(minePlace);
  }
  return minePlacesArr;
};

export default createMinePlace;
