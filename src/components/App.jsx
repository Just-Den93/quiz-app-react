import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './QuizPage';
import QuizCard from './QuizCard';
import Sidebar from './Sidebar';
import styles from '../styles/App.module.css';
import { useQuizContext } from '../context/QuizContext';
import { loadUniqueUuids } from '../utils/loadJsonData';

function App() {
  const { showQuizPage, setShowQuizPage, setSelectedMode, setCurrentQuizId } = useQuizContext();
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const uniqueData = loadUniqueUuids();
    setQuizData(uniqueData);
  }, []);

  const startQuiz = (mode, uuid) => {
    setSelectedMode(mode);
    setCurrentQuizId(uuid);
    setShowQuizPage(true);
    localStorage.setItem('showQuizPage', 'true');
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
                  quizData.map((data) => (
                    <QuizCard
                      key={data.uuid}
                      startQuiz={() => startQuiz(data.mode, data.uuid)}
                      mode={data.mode}
                      uuid={data.uuid}
                      category={data.categories[0]}
                    />
                  ))
                ) : null
              }
            />
          </Routes>
        </div>
        {showQuizPage && (
          <div className={styles.fullscreen}>
            <QuizPage />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
