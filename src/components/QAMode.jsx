import React from 'react';
import Timer from './Timer';
import SelectCategoryButton from './SelectCategoryButton';
import ShowAnswerButton from './ShowAnswerButton';
import styles from '../styles/QAMode.module.css';

function QAMode({ block, showAnswer, setTimerStarted, timerStarted, timerEnded, handleTimerEnd, handleShowAnswer, handleSelectCategory, handleForceStop }) {
  if (!block) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.content}>
      <div className={styles.selectedInfo}>
        <span className={styles.infoCategoryName}>{block.categoryName || 'No Category'}</span>
        <div className={styles.selectedNumber}>{block.id + 1}</div>
      </div>
      <h2>{showAnswer ? block.answer : block.question}</h2>
      {showAnswer && <p className={styles.subAnswer}>{block.subAnswer}</p>}
      <div className={styles.controlBlock}>
        {!timerStarted ? (
          <button className={styles.startTimerButton} onClick={() => setTimerStarted(true)}>
            <img src="./images/refresh-ccw-clock-svgrepo-com.svg" alt="Start Timer" className={styles.startButtonIcon} />
          </button>
        ) : !timerEnded ? (
          <Timer duration={30} onEnd={handleTimerEnd} onForceStop={handleForceStop} />
        ) : (
          !showAnswer && (
            <ShowAnswerButton onClick={handleShowAnswer} />
          )
        )}
        {showAnswer && (
          <SelectCategoryButton onClick={handleSelectCategory} />
        )}
      </div>
    </div>
  );
}

export default QAMode;
