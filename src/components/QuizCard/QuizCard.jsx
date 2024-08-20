import React from 'react';
import PropTypes from 'prop-types';
import styles from './QuizCard.module.css';

function QuizCard({ startQuiz, mode }) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        {/* Placeholder for image */}
      </div>
      <div className={styles.details}>
        <h2>Quiz Mode {mode}</h2> {/* Displaying mode */}
        <p>Affiliation</p>
        <div className={styles.bottomRow}>
          <p className={styles.games}>Games: 0</p>
          <button className={styles.startButton} onClick={startQuiz}>
            Почати наживо
          </button>
        </div>
      </div>
    </div>
  );
}

QuizCard.propTypes = {
  startQuiz: PropTypes.func.isRequired,
  mode: PropTypes.number.isRequired, // Добавлен тип реквизита для режима
};

export default QuizCard;