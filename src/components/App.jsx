import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './QuizPage';
import QuizCard from './QuizCard';
import Sidebar from './Sidebar';
import styles from '../styles/App.module.css';
import { loadFileCount } from '../utils/loadData';
import { handleShowQuizPage, handleShowMainMenu, handleNewGame } from '../utils/appUtils';

function App() {
  const [showQuizPage, setShowQuizPage] = useState(() => {
    const savedState = localStorage.getItem('showQuizPage');
    return savedState === 'true';
  });
  const [fileCount, setFileCount] = useState(0);
  const [selectedMode, setSelectedMode] = useState(null);

  useEffect(() => {
    const count = loadFileCount();
    setFileCount(count);
  }, []);

  const startQuiz = (mode) => {
    setSelectedMode(mode);
    handleShowQuizPage(setShowQuizPage);
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
                      startQuiz={() => startQuiz(index + 1)} // Начните викторину с соответствующего режима
                      mode={index + 1} // Передача режима в QuizCard для отображения (если необходимо)
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
              mode={selectedMode} // Передача выбранного режима в QuizPage
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
