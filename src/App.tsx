import styled from 'styled-components';
import GameBoard from './components/GameBoard/GameBoard';
import GameController from './components/GameController/GameController';

function App() {
  return (
    <S_Wrapper>
      <GameController />
      <GameBoard />
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default App;
