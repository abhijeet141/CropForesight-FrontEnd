import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

ReactDOM.render(
  <React.StrictMode>
    <App darkMode={prefersDarkMode} />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
