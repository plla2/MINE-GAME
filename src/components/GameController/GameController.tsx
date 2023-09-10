import { useEffect, useState } from 'react';
import logo from '../../assets/logo.webp';
import { useAppDispatch } from '../../redux/rtk-hooks/useAppDispatch';
import { gameActions } from '../../redux/slice/gameSlice';
import { useAppSelector } from '../../redux/rtk-hooks/useAppSelector';

const GameController = () => {
  const dispatch = useAppDispatch();
  const [customRow, setCustomRow] = useState(0);
  const [customCol, setCustomCol] = useState(0);
  const [customMine, setCustomMine] = useState(0);

  const { rowCount, colCount, mineCount } = useAppSelector((state) => state.game.size);

  useEffect(() => {
    dispatch(gameActions.resizeBoard({ rowCount: 8, colCount: 8, mineCount: 10 }));
  }, []);

  return (
    <div>
      <div>
        <img src={logo} alt="로고 사진" />
        <p>지뢰 찾기</p>
      </div>
      <div>
        <span>Level</span>
        <button
          type="button"
          onClick={() => dispatch(gameActions.resizeBoard({ rowCount: 8, colCount: 8, mineCount: 10 }))}
        >
          Beginner
        </button>
        <button
          type="button"
          onClick={() => dispatch(gameActions.resizeBoard({ rowCount: 16, colCount: 16, mineCount: 40 }))}
        >
          Intermediate
        </button>
        <button
          type="button"
          onClick={() => dispatch(gameActions.resizeBoard({ rowCount: 16, colCount: 32, mineCount: 100 }))}
        >
          Expert
        </button>
      </div>
      <div>
        <span>Custom(가로, 세로, 지뢰수)</span>
        <div>
          <input type="number" value={customCol} onChange={(e) => setCustomCol(Number(e.target.value))} /> X{' '}
          <input type="number" value={customRow} onChange={(e) => setCustomRow(Number(e.target.value))} />{' '}
          <input type="number" value={customMine} onChange={(e) => setCustomMine(Number(e.target.value))} />
        </div>
        <button
          type="button"
          onClick={() => {
            dispatch(gameActions.resizeBoard({ rowCount: customRow, colCount: customCol, mineCount: customMine }));
          }}
        >
          Custom
        </button>
        <button onClick={() => dispatch(gameActions.resizeBoard({ rowCount, colCount, mineCount }))} type="button">
          Reset
        </button>
      </div>
    </div>
  );
};

export default GameController;
