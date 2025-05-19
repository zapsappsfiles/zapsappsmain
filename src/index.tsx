import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initGSAP, setupScrollAnimations, cleanupGSAP } from './assets/gsapConfig';
import { ThemeProvider } from './contexts/ThemeContext';
import './assets/fonts';

// Initialize GSAP
initGSAP();

// Initialize React app with strict mode
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider>
    <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Set up scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupScrollAnimations();
});

// Clean up GSAP animations when component unmounts
window.addEventListener('beforeunload', () => {
  cleanupGSAP();
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
