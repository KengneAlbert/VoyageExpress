import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
// import SearchTrips from './test';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <React.StrictMode>
    {/* <SearchTrips />  */}
    <App />
  </React.StrictMode>
);