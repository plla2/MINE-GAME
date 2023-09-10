import { CELL_TYPE, GAME_STATUS } from '../../constant/Const';
import createMinePlace from '../../logic/createMinePlace';
import { useAppDispatch } from '../../redux/rtk-hooks/useAppDispatch';
import { useAppSelector } from '../../redux/rtk-hooks/useAppSelector';
import * as S from './CellStyle';
import settingMines from '../../logic/settingMines';
import { gameActions } from '../../redux/slice/gameSlice';
import countAroundMine from '../../logic/countAroundMine';

const Cell = ({ cellOnce, colIndex, rowIndex }: { cellOnce: number; rowIndex: number; colIndex: number }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.game.status);
  const gameBoardData = useAppSelector((state) => state.game.gameBoardData);
  const { rowCount, colCount, mineCount } = useAppSelector((state) => state.game.size);

  // cell내부에 들어갈 텍스트를 반환해주는 함수
  const getCellText = (cellType: number) => {
    switch (cellType) {
      case CELL_TYPE.NORMAL:
      case CELL_TYPE.MINE:
        return '';
      case CELL_TYPE.MINECLICK:
        return '💣';
      case CELL_TYPE.FLAG:
      case CELL_TYPE.FLAG_MINE:
        return '🚩';
      case CELL_TYPE.QUESTION_MINE:
      case CELL_TYPE.QUESTION:
        return '❔';
      default:
        return cellType || '';
    }
  };

  // 이미 open한 cell을 따로 캐싱하여 해당cell들은 제외하고 연산
  const alreadyOpened: string[] = [];

  // 주변 cell들을 체크해서 지뢰가 없으면 한번에 open해주는 함수
  const checkAround = ({ row, col, gameBoardData }: { row: number; col: number; gameBoardData: number[][] }) => {
    // cell의 상,하,좌,우가 없는 cell은 아무것도 실행하지 않는다.
    if (row < 0 || row >= gameBoardData.length || col < 0 || col >= gameBoardData[0].length) {
      return;
    }

    // 해당 cell이 아래 5가지의 경우에 해당하지않고, 닫혀있는 상태일때만 open한다.
    if (
      [CELL_TYPE.FLAG, CELL_TYPE.FLAG_MINE, CELL_TYPE.OPENED, CELL_TYPE.QUESTION, CELL_TYPE.QUESTION_MINE].includes(
        gameBoardData[row][col],
      )
    ) {
      return;
    }
    // 만약 이전에 open이 됐던 cell은 제외
    if (alreadyOpened.includes(`${row}/${col}`)) {
      return;
    }
    alreadyOpened.push(`${row}/${col}`);

    const aroundMineCount = countAroundMine({ row, col, gameBoardData });

    if (aroundMineCount === 0) {
      if (row > -1) {
        const around = [];
        if (row - 1 > -1) {
          around.push([row - 1, col - 1]);
          around.push([row - 1, col]);
          around.push([row - 1, col + 1]);
        }
        around.push([row, col - 1]);
        around.push([row, col + 1]);
        if (row + 1 < gameBoardData.length) {
          around.push([row + 1, col - 1]);
          around.push([row + 1, col]);
          around.push([row + 1, col + 1]);
        }
        around.forEach((aroundCell) => {
          if (gameBoardData[aroundCell[0]][aroundCell[1]] !== CELL_TYPE.OPENED) {
            checkAround({ row: aroundCell[0], col: aroundCell[1], gameBoardData });
          }
        });
      }
    }
    dispatch(gameActions.open({ row, col, mineCount: aroundMineCount }));
  };

  const clickLeftMouse = (firstSelectPlace: number) => {
    // 이번 클릭이 처음 클릭일 경우
    if (status === GAME_STATUS.READY) {
      const minePlacesArr = createMinePlace({
        row: rowCount,
        col: colCount,
        mineCount: mineCount,
        firstSelectPlace,
      });
      const startingBoard = settingMines({
        col: colCount,
        minePlacesArr,
        gameBoardData,
      });
      dispatch(gameActions.start({ gameBoardData: startingBoard }));
      checkAround({ row: rowIndex, col: colIndex, gameBoardData: startingBoard });
    } else {
      // 이번 클릭이 첫클릭이 아닐 경우

      if (cellOnce === CELL_TYPE.NORMAL) {
        checkAround({ row: rowIndex, col: colIndex, gameBoardData });
      }
      if (cellOnce === CELL_TYPE.MINE) {
        dispatch(gameActions.open({ row: rowIndex, col: colIndex }));
      }
    }
  };

  const clickRightMouse = (e: React.MouseEvent) => {
    // e.preventDefault()를 사용하여 마우스 오른쪽 버튼을 클릭했을 때,
    // 브라우저에서 컨텍스트 메뉴가 열리는 것을 막는다.
    e.preventDefault();
    dispatch(gameActions.clickRight({ rowIndex, colIndex }));
  };

  return (
    <S.CellButton
      onClick={() => {
        clickLeftMouse(colCount * rowIndex + colIndex);
      }}
      onContextMenu={(e) => {
        clickRightMouse(e);
      }}
      $isOpen={cellOnce >= CELL_TYPE.OPENED}
      $isBomb={cellOnce === CELL_TYPE.MINECLICK}
      disabled={status === GAME_STATUS.LOSE || status === GAME_STATUS.WIN}
    >
      {getCellText(cellOnce)}
    </S.CellButton>
  );
};
export default Cell;
