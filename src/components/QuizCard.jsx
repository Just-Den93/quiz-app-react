import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/QuizCard.module.css';

function QuizCard({ startQuiz, mode }) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        {/* Заполнитель для изображения */}
      </div>
      <div className={styles.details}>
        <h2>Режим Викторины {mode}</h2> {/* Отображение режима */}
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
  startQuiz: PropTypes.func.isRequired,
  mode: PropTypes.number.isRequired, // Добавлено prop тип для режима
};

export default QuizCard;
