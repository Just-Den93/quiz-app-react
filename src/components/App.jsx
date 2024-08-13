import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './QuizPage';
import QuizCard from './QuizCard';
import Sidebar from './Sidebar';
import styles from '../styles/App.module.css';
import { QuizProvider, useQuizContext } from '../context/QuizContext';
import { loadUniqueUuids } from '../utils/loadJsonData'; // Импорт функции

function App() {
  const { showQuizPage, setShowQuizPage, selectedMode, setSelectedMode } = useQuizContext();
  const [quizData, setQuizData] = useState([]); // Добавлено состояние для хранения данных

  useEffect(() => {
    const uniqueData = loadUniqueUuids(); // Загрузка данных
    setQuizData(uniqueData); // Установка данных в состояние
  }, []);

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
                  quizData.map((data, index) => (
                    <QuizCard
                      key={data.uuid}
                      startQuiz={() => startQuiz(data.mode)}
                      mode={data.mode}
                      uuid={data.uuid}
                      category={data.categories[0]} // Отображаем первую категорию как пример
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
