import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './QuizPage';
import QuizCard from './QuizCard';
import Sidebar from './Sidebar';
import styles from '../styles/App.module.css';

function App() {
  const [showQuizPage, setShowQuizPage] = useState(() => {
    const savedState = localStorage.getItem('showQuizPage');
    return savedState === 'true';
  });

  const handleShowQuizPage = () => {
    setShowQuizPage(true);
    localStorage.setItem('showQuizPage', 'true');
  };

  const handleShowMainMenu = () => {
    setShowQuizPage(false);
    localStorage.setItem('showQuizPage', 'false');
  };

  const handleNewGame = () => {
    localStorage.removeItem('usedBlocks');
    setShowQuizPage(false);
    setTimeout(() => {
      setShowQuizPage(true);
    }, 0);
  };

  return (
    <Router>
      <div className={styles.container}>
        {!showQuizPage && <Sidebar />}
        <div className={showQuizPage ? styles.hidden : styles.content}>
          <Routes>
            <Route
              path="/"
              element={
                !showQuizPage ? (
                  <QuizCard startQuiz={handleShowQuizPage} showMainMenu={handleShowMainMenu} handleNewGame={handleNewGame} />
                ) : null
              }
            />
          </Routes>
        </div>
        {showQuizPage && (
          <div className={styles.fullscreen}>
            <QuizPage showMainMenu={handleShowMainMenu} handleNewGame={handleNewGame} />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
