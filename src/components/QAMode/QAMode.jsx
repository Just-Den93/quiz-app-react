import React, { useState, useEffect } from 'react';
import StartTimerButton from '../ButtonComponents/StartTimerButton/StartTimerButton';
import Timer from '../Timer/Timer';
import SelectCategoryButton from '../ButtonComponents/SelectCategoryButton/SelectCategoryButton';
import ShowAnswerButton from '../ButtonComponents/ShowAnswerButton/ShowAnswerButton';
import styles from './QAMode.module.css';
import { resetQAState, handleQAActions } from './QAModeUtils';

function QAMode({
  block,
  showAnswer,
  setTimerStarted,
  timerStarted,
  timerEnded,
  handleTimerEnd,
  handleShowAnswer,
  handleSelectCategory,
  handleForceStop,
}) {
  const [forceStopped, setForceStopped] = useState(false);
  const [answerShown, setAnswerShown] = useState(false); // Локальное состояние для контроля отображения кнопок
  const [localTimerStarted, setLocalTimerStarted] = useState(false); // Локальное состояние для контроля таймера

  useEffect(() => {
    resetQAState(setForceStopped, setAnswerShown, setLocalTimerStarted); // Используем вынесенную функцию для сброса состояния
  }, [block]);

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
        {!localTimerStarted ? (
          <StartTimerButton onClick={() => handleQAActions.startTimer(setTimerStarted, setLocalTimerStarted)} />
        ) : !timerEnded ? (
          <Timer
            duration={30}
            onEnd={handleTimerEnd}
            onForceStop={() => handleQAActions.forceStop(handleForceStop, setForceStopped)}
            forceStopped={forceStopped}
          />
        ) : !answerShown ? (
          <ShowAnswerButton onClick={() => handleQAActions.showAnswer(handleShowAnswer, setAnswerShown)} />
        ) : (
          <SelectCategoryButton onClick={handleSelectCategory} />
        )}
      </div>
    </div>
  );
}

export default QAMode;
