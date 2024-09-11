import React from 'react';
import PropTypes from 'prop-types';
import { useQuizContext } from '../../context/QuizContext';
import styles from './QuizCard.module.css';
import quizImage from '../../images/quizpng.png';
import { ReactComponent as PCImage } from '../../images/PC_horizontal_1line_color.svg';

function QuizCard({ startQuiz, mode, name }) {
  const { completedGames } = useQuizContext();

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={quizImage} alt="Quiz Image" className={styles.imageContent} />
      </div>
      <div className={styles.details}>
        <h2>{name}</h2> {/* Отображаем название викторины */}
        <div className={styles.bottomRow}>
          <PCImage className={styles.affiliationIcon} />
          <p className={styles.games}>Ігри: {completedGames}</p>
          <button className={styles.startButton} onClick={startQuiz}>
            Провести наживо
          </button>
        </div>
      </div>
    </div>
  );
}

QuizCard.propTypes = {
  startQuiz: PropTypes.func.isRequired,
  mode: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired, // Добавляем новый проп для имени викторины
};

export default QuizCard;
