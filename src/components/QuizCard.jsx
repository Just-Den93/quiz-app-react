import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/QuizCard.module.css';

function QuizCard({ data, startQuiz }) {
  if (!data || !data.blocks) {
    return null;
  }

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        {/* Placeholder for image */}
      </div>
      <div className={styles.details}>
        <h2>{data.name}</h2>
        <p>{data.blocks.length} запитань</p>
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

QuizCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    blocks: PropTypes.array.isRequired,
  }).isRequired,
  startQuiz: PropTypes.func.isRequired,
};

export default QuizCard;
