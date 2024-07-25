import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../styles/QuizCard.module.css';

function QuizCard() {
  const history = useHistory();

  const startGame = () => {
    history.push('/categories');
  };

  return (
    <div className={styles.quizCard}>
      <img src="https://via.placeholder.com/150" alt="Placeholder" className={styles.image} />
      <button className={styles.startButton} onClick={startGame}>Провести наживо</button>
    </div>
  );
}

export default QuizCard;
