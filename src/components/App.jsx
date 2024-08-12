import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './QuizPage';
import QuizCard from './QuizCard';
import Sidebar from './Sidebar';
import styles from '../styles/App.module.css';
import { QuizProvider, useQuizContext } from '../context/QuizContext';

function App() {
  const { showQuizPage, setShowQuizPage, selectedMode, setSelectedMode } = useQuizContext();

  const startQuiz = (mode) => {
    setSelectedMode(mode);
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
                  Array.from({ length: 10 }).map((_, index) => (
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
        {showQuizPage && (
          <div className={styles.fullscreen}>
            <QuizPage />
          </div>
        )}
      </div>
    </Router>
  );
}

// Оборачиваем приложение в провайдер контекста
export default function AppWrapper() {
  return (
    <QuizProvider>
      <App />
    </QuizProvider>
  );
}
