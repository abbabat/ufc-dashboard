import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n';          // initialize i18n before App

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
