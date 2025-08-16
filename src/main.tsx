// src/main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from "react-router-dom"; // <-- 1. ДОБАВЛЯЕМ ЭТУ СТРОЧКУ

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter> {/* <-- 2. Оборачиваем App */}
      <App />
    </BrowserRouter>
  </StrictMode>
);