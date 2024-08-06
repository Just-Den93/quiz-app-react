import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/QuizCard.module.css';

function QuizCard({ startQuiz }) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        {/* Placeholder for image */}
      </div>
      <div className={styles.details}>
        <h2>Quiz Title</h2>
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
};

export default QuizCard;
