// src/components/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Sidebar';
import styles from '../styles/App.module.css';
import { loadFileCount } from '../utils/loadData';
import { handleShowQuizPage, handleShowMainMenu, handleNewGame } from '../utils/appUtils';
import AppRoutes from './AppRoutes';
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
    dispatch(setSelectedMode(mode));
    handleShowQuizPage(dispatch);
  };

  return (
    <Router>
      <div className={styles.container}>
        {!showQuizPage && <Sidebar />}
        <div className={showQuizPage ? styles.hidden : styles.content}>
          <AppRoutes
            fileCount={fileCount}
            showQuizPage={showQuizPage}
            startQuiz={startQuiz}
            handleShowMainMenu={() => handleShowMainMenu(dispatch)}
            handleNewGame={() => handleNewGame(dispatch)}
            selectedMode={selectedMode}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
