import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// index.html root 위치에 app.js를 그려라
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

