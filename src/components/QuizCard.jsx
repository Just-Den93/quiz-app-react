import React from 'react';
import styles from '../styles/QuizCard.module.css';
import QuizPage from './QuizPage';

function QuizCard({ startQuiz, showMainMenu, handleNewGame }) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <QuizPage miniature={true} showMainMenu={showMainMenu} handleNewGame={handleNewGame} />
      </div>
      <div className={styles.details}>
        <h2>Вікторина Південна</h2>
        <p>20 запитань</p>
        <p>Just_Dens</p>
        <div className={styles.bottomRow}>
          <p className={styles.games}>Ігри: 0</p>
          <button className={styles.startButton} onClick={startQuiz}>
            Провести наживо
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
