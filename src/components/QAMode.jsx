import React from 'react';
import styles from '../styles/QAMode.module.css';

function QAMode({ question, answer, subAnswer, showAnswer }) {
  return (
    <div className={styles.content}>
      <h2>{showAnswer ? answer : question}</h2>
      {showAnswer && <p className={styles.subAnswer}>{subAnswer}</p>}
    </div>
  );
}

export default QAMode;