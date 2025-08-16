// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import EditorPage from './pages/EditorPage';
import PublicPage from './pages/PublicPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/page/:userId" element={<PublicPage />} />
      </Routes>
    </div>
  );
}

export default App; // <-- Убедитесь, что эта строка есть и она именно такая