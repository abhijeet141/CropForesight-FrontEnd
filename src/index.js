import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Check if the user prefers dark mode
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set the initial mode based on user preference
const initialMode = prefersDarkMode ? 'dark' : 'light';

// Function to toggle the mode
const toggleMode = () => {
  document.documentElement.classList.toggle('dark-mode');
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Add event listener to toggle mode when the button is clicked
const modeToggleBtn = document.getElementById('mode-toggle-btn');
if (modeToggleBtn) {
  modeToggleBtn.addEventListener('click', toggleMode);
}

// Set the initial mode on page load
if (initialMode === 'dark') {
  toggleMode();
}
