import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/QuizCard.module.css';

function QuizCard({ mode, startQuiz }) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        {/* Placeholder for image */}
      </div>
      <div className={styles.details}>
        <h2>Режим Викторины {mode}</h2>
        <p>Принадлежность</p>
        <div className={styles.bottomRow}>
          <p className={styles.games}>Игры: 0</p>
          <button className={styles.startButton} onClick={startQuiz}>
            Почати наживо
          </button>
        </div>
      </div>
    </div>
  );
}

QuizCard.propTypes = {
  mode: PropTypes.number.isRequired,
  startQuiz: PropTypes.func.isRequired,
};

export default QuizCard;
