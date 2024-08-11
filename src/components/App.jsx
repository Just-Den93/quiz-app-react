// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import QuizPage from './QuizPage';
import QuizCard from './QuizCard';
import styles from '../styles/App.module.css';
import { loadFileCount } from '../utils/loadData';
import { handleShowQuizPage, handleShowMainMenu, handleNewGame } from '../utils/appUtils';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMode } from '../store/actions';

function App() {
  const dispatch = useDispatch();
  const showQuizPage = useSelector((state) => state.quiz.showQuizPage);
  const selectedMode = useSelector((state) => state.quiz.selectedMode);
  const [fileCount, setFileCount] = useState(0);

  useEffect(() => {
    const count = loadFileCount();
    setFileCount(count);
  }, []);

  const startQuiz = (mode) => {
    console.log('Starting quiz with mode:', mode);
    dispatch(setSelectedMode(mode));
    handleShowQuizPage(dispatch);
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
                      mode={index + 1}
                      startQuiz={() => startQuiz(index + 1)}
                    />
                  ))
                ) : (
                  <QuizPage
                    mode={selectedMode}
                    showMainMenu={() => handleShowMainMenu(dispatch)}
                    handleNewGame={() => handleNewGame(dispatch)}
                  />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
