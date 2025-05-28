import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Set up scroll animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Any global initialization can go here
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
