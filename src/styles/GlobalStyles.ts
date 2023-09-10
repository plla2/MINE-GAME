import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle` 

  // 크로스 브라우징을 위해서 styled-reset을 사용한다.
  ${reset}

`;

export default GlobalStyles;
