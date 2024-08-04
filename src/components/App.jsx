import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './QuizPage';
import QuizCard from './QuizCard';
import Sidebar from './Sidebar';
import styles from '../styles/App.module.css';
import { loadData } from '../utils/loadData';
import { handleShowQuizPage, handleShowMainMenu, handleNewGame } from '../utils/appUtils';

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
                      startQuiz={() => handleShowQuizPage(setShowQuizPage)}
                    />
                  ))
                ) : null
              }
            />
          </Routes>
        </div>
        {showQuizPage && (
          <div className={styles.fullscreen}>
            <QuizPage
              showMainMenu={() => handleShowMainMenu(setShowQuizPage)}
              handleNewGame={() => handleNewGame(setShowQuizPage)}
            />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
