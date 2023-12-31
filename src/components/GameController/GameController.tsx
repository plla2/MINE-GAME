import { useEffect, useState } from 'react';
import logo from '../../assets/logo.webp';
import { useAppDispatch } from '../../redux/rtk-hooks/useAppDispatch';
import { gameActions } from '../../redux/slice/gameSlice';
import { useAppSelector } from '../../redux/rtk-hooks/useAppSelector';
import useInterval from '../hooks/useInterval';
import * as S from './GameControllerStyle';

const GameController = () => {
  const dispatch = useAppDispatch();
  const [customRow, setCustomRow] = useState(0);
  const [customCol, setCustomCol] = useState(0);
  const [customMine, setCustomMine] = useState(0);
  const timer = useAppSelector((state) => state.game.timer);
  const isPlaying = useAppSelector((state) => state.game.isPlaying);

  const { rowCount, colCount, mineCount } = useAppSelector((state) => state.game.size);

  // 처음 렌더링에서는 size가 8x8, 지뢰수가10개인 게임보드가 설정된다.
  useEffect(() => {
    dispatch(gameActions.resizeBoard({ rowCount: 8, colCount: 8, mineCount: 10 }));
  }, []);

  // useInterval 커스텀훅을 통해 일정시간동안 반복적으로 콜백함수를 실행시키는데,
  // isPlaying이 true일 때 updateTimer 리듀서를 1000ms마다 반복적으로 실행시킨다.
  useInterval(
    () => {
      dispatch(gameActions.updateTimer());
    },
    isPlaying ? 1000 : null,
  );

  // level에 따라 게임보드의 크기, 지뢰의 수가 바뀌기 때문에 함수 하나로 만들어서,
  // resizeBoard 리듀서를 통해 매개변수로 받은 3개의 값으로 dispatch할 수 있게 해주었다.
  const handleLevelChange = (rowCount: number, colCount: number, mineCount: number) => {
    dispatch(gameActions.resizeBoard({ rowCount, colCount, mineCount }));
  };

  // handleLevelChange 함수와 마찬가지로 사용자가 입력한 값으로 setState를 통해 변경된,
  // 게임보드 크기, 지뢰 개수 상태로 dispatch 한다.
  const handleCustomResize = () => {
    if (customRow > 0 && customCol > 0 && customMine >= 0) {
      dispatch(gameActions.resizeBoard({ rowCount: customRow, colCount: customCol, mineCount: customMine }));
    } else {
      alert('양수를 입력해주세요 !!');
    }
  };

  return (
    <S.Container>
      <S.Header>
        <img src={logo} alt="로고 사진" />
        <p>지뢰 찾기 - 클라썸 과제 2</p>
      </S.Header>
      <S.LevelWrapper>
        <span>Level :</span>
        <button type="button" onClick={() => handleLevelChange(8, 8, 10)}>
          Beginner
        </button>
        <button type="button" onClick={() => handleLevelChange(16, 16, 40)}>
          Intermediate
        </button>
        <button type="button" onClick={() => handleLevelChange(16, 32, 100)}>
          Expert
        </button>
      </S.LevelWrapper>
      <S.CustomWrapper>
        <div className="custom_content">
          <span>Custom(가로, 세로, 지뢰수)</span>
          <div className="inputs">
            <input type="number" value={customCol} onChange={(e) => setCustomCol(Number(e.target.value))} />
            <p>X</p>
            <input type="number" value={customRow} onChange={(e) => setCustomRow(Number(e.target.value))} />
            <input type="number" value={customMine} onChange={(e) => setCustomMine(Number(e.target.value))} />
          </div>
        </div>
        <div>
          <button type="button" onClick={handleCustomResize}>
            Custom
          </button>
        </div>
      </S.CustomWrapper>
      <S.Timer>
        <span>경과 시간 : {timer}초</span>
        <button onClick={() => handleLevelChange(rowCount, colCount, mineCount)} type="button">
          Restart
        </button>
      </S.Timer>
    </S.Container>
  );
};

export default GameController;
