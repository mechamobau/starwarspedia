import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';

import i18n from './i18n';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
