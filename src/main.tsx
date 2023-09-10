import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/resetStyles.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store/store.ts';
import PageLayout from './components/PageLayout/PageLayout.tsx';
import GlobalStyles from './styles/GlobalStyles.ts';
import { ThemeProvider } from 'styled-components';
import ThemeColors from './styles/ThemeColors.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={ThemeColors}>
    <Provider store={store}>
      <PageLayout>
        <GlobalStyles />
        <App />
      </PageLayout>
    </Provider>
  </ThemeProvider>,
);
