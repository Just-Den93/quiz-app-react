import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './QuizPage';
import QuizCard from './QuizCard';
import Sidebar from './Sidebar';
import styles from '../styles/App.module.css';
import { loadData } from '../utils/loadData';

function App() {
  const [showQuizPage, setShowQuizPage] = useState(() => {
    const savedState = localStorage.getItem('showQuizPage');
    return savedState === 'true';
  });

  const [fileCount, setFileCount] = useState(0);

  useEffect(() => {
    const data = loadData();
    setFileCount(data.length);
  }, []);

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
                  Array.from({ length: fileCount }).map((_, index) => (
                    <QuizCard
                      key={index}
                      startQuiz={handleShowQuizPage}
                    />
                  ))
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
