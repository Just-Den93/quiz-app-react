import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './QuizPage';
import QuizCard from './QuizCard';
import Sidebar from './Sidebar';
import styles from '../styles/App.module.css';

function App() {
  const [showQuizPage, setShowQuizPage] = useState(false);

  const handleShowQuizPage = () => {
    setShowQuizPage(true);
  };

  const handleShowMainMenu = () => {
    setShowQuizPage(false);
  };

  return (
    <Router>
      <div className={styles.container}>
        {!showQuizPage && <Sidebar />}
        <Routes>
          <Route
            path="/quiz"
            element={
              !showQuizPage ? (
                <QuizCard startQuiz={handleShowQuizPage} />
              ) : (
                <QuizPage showMainMenu={handleShowMainMenu} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
