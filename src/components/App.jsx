// src/components/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './QuizPage';
import QuizCard from './QuizCard';
import Sidebar from './Sidebar';
import styles from '../styles/App.module.css';

function App() {
  const [view, setView] = useState('main'); // 'main' or 'quiz'

  const showMainMenu = () => {
    setView('main');
  };

  const showQuizPage = () => {
    setView('quiz');
  };

  return (
    <Router>
      <div className={styles.container}>
        {view === 'main' && <Sidebar />}
        <Routes>
          <Route path="/" element={<QuizCard showQuizPage={showQuizPage} />} />
          <Route path="/quiz" element={<QuizPage showMainMenu={showMainMenu} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
