// src/components/QuizCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/QuizCard.module.css';

function QuizCard({ showQuizPage }) {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    showQuizPage();
    navigate('/quiz');
  };

  return (
    <div className={styles.container}>
      <h2>Quiz Card</h2>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
}

export default QuizCard;
