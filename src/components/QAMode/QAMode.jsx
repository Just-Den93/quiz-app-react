import React, { useState, useEffect } from 'react';
import StartTimerButton from '../StartTimerButton/StartTimerButton';
import Timer from '../Timer/Timer';
import SelectCategoryButton from '../SelectCategoryButton/SelectCategoryButton';
import ShowAnswerButton from '../ShowAnswerButton/ShowAnswerButton';
import styles from './QAMode.module.css';

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
    // Сброс состояния при изменении блока или при открытии модального окна
    setForceStopped(false);
    setAnswerShown(false);
    setLocalTimerStarted(false);
  }, [block]);

  const handleForceStopInternal = () => {
    handleForceStop();
    setForceStopped(true);
  };

  const handleShowAnswerInternal = () => {
    handleShowAnswer();
    setAnswerShown(true); // Обновляем локальное состояние после показа ответа
  };

  const handleStartTimerInternal = () => {
    setTimerStarted(true);
    setLocalTimerStarted(true);
  };

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
          <StartTimerButton onClick={handleStartTimerInternal} />
        ) : !timerEnded ? (
          <Timer duration={30} onEnd={handleTimerEnd} onForceStop={handleForceStopInternal} forceStopped={forceStopped} />
        ) : !answerShown ? (
          <ShowAnswerButton onClick={handleShowAnswerInternal} />
        ) : (
          <SelectCategoryButton onClick={handleSelectCategory} />
        )}
      </div>
    </div>
  );
}

export default QAMode;
