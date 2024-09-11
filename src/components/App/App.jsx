import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from '../QuizPage/QuizPage';
import QuizCard from '../QuizCard/QuizCard';
import Sidebar from '../Sidebar/Sidebar';
import styles from './App.module.css';
import { useQuizContext } from '../../context/QuizContext';
import { loadUniqueUuids } from '../../utils/loadJsonData';
import { startQuizHandler } from './appUtils';


function App() {
  const { showQuizPage, setShowQuizPage, setSelectedMode, setCurrentQuizId } = useQuizContext();
  const [quizData, setQuizData] = useState([]);


  useEffect(() => {
    const uniqueData = loadUniqueUuids();
    setQuizData(uniqueData);
  }, []);


  return (
    <Router>
      <div className={styles.container}>
        {!showQuizPage && <Sidebar />}
        <div className={styles.content_wraper}>
          <div className={showQuizPage ? styles.hidden : styles.content}>
            <Routes>
              <Route
                path="/"
                element={
                  !showQuizPage ? (
                    quizData.map((data) => (
                      <QuizCard
                        key={data.uuid}
                        startQuiz={() => startQuizHandler(data.mode, data.uuid, setSelectedMode, setCurrentQuizId, setShowQuizPage)}
                        mode={data.mode}
                        uuid={data.uuid}
                        name={data.name}
                        category={data.categories[0]}
                      />
                    ))
                  ) : null
                }
              />
            </Routes>
          </div>
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
