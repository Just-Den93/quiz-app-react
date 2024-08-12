import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './QuizPage';
import QuizCard from './QuizCard';
import Sidebar from './Sidebar';
import styles from '../styles/App.module.css';
import { QuizProvider, useQuizContext } from '../context/QuizContext';
import { loadJsonDataByMode } from '../utils/loadJsonData';

function App() {
  const { showQuizPage, setShowQuizPage, selectedMode, setSelectedMode } = useQuizContext();
  const [quizData, setQuizData] = React.useState(null);

  React.useEffect(() => {
    if (selectedMode !== null) {
      const data = loadJsonDataByMode(selectedMode);
      setQuizData(data);
    }
  }, [selectedMode]);

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
                !showQuizPage && quizData ? (
                  quizData.categories.map((category) => (
                    <QuizCard
                      key={category.id}
                      startQuiz={() => startQuiz(quizData.mode)}
                      mode={quizData.mode}
                      uuid={quizData.uuid}
                      category={category} // передача категории для использования в QuizCard
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
