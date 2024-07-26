import React from 'react';
import styles from '../styles/QuizCard.module.css';

function QuizCard({ startQuiz }) {
  return (
    <div className={styles.container}>
      <h2>Quiz Card</h2>
      <button onClick={startQuiz}>Почати наживо</button>
    </div>
  );
}

export default QuizCard;
