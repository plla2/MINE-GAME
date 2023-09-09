import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/resetStyles.css';
import { Provider } from 'react-redux';
import { store } from './redux/store/store.ts';
import PageLayout from './components/PageLayout/PageLayout.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PageLayout>
        <App />
      </PageLayout>
    </Provider>
  </React.StrictMode>,
);
