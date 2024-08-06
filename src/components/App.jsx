import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './QuizPage';
import QuizCard from './QuizCard';
import Sidebar from './Sidebar';
import styles from '../styles/App.module.css';
import { loadFileCount } from '../utils/loadData';
import { handleShowQuizPage, handleShowMainMenu, handleNewGame } from '../utils/appUtils';

function App() {
  // State to track whether the quiz page is being shown
  const [showQuizPage, setShowQuizPage] = useState(() => {
    const savedState = localStorage.getItem('showQuizPage');
    return savedState === 'true';
  });

  // State to track the number of quiz files
  const [fileCount, setFileCount] = useState(0);

  // State to track the selected quiz mode
  const [selectedMode, setSelectedMode] = useState(null);

  // Load the file count on component mount
  useEffect(() => {
    const count = loadFileCount();
    setFileCount(count);
  }, []);

  // Function to start the quiz with the specified mode
  const startQuiz = (mode) => {
    setSelectedMode(mode);
    handleShowQuizPage(setShowQuizPage);
  };

  return (
    <Router>
      <div className={styles.container}>
        {/* Sidebar is shown when quiz page is not being shown */}
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
                      startQuiz={() => startQuiz(index + 1)}
                      mode={index + 1}
                    />
                  ))
                ) : null
              }
            />
          </Routes>
        </div>
        {/* QuizPage is conditionally rendered based on showQuizPage state */}
        {showQuizPage && (
          <div className={styles.fullscreen}>
            <QuizPage
              mode={selectedMode}
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
