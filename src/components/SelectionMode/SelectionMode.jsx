import React, { useState, useEffect } from 'react';
import StartTimerButton from '../StartTimerButton/StartTimerButton';
import Timer from '../Timer/Timer';
import SelectCategoryButton from '../SelectCategoryButton/SelectCategoryButton';
import ShowAnswerButton from '../ShowAnswerButton/ShowAnswerButton';
<<<<<<< HEAD
import HintButton from '../HintButton/HintButton';
=======
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
import styles from './SelectionMode.module.css';

function SelectionMode({
  block,
<<<<<<< HEAD
  categoryName,
=======
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
  showAnswer,
  setTimerStarted,
  timerStarted,
  timerEnded,
  handleTimerEnd,
  handleShowAnswer,
  handleSelectCategory,
  handleForceStop,
}) {
<<<<<<< HEAD
  const [answerShown, setAnswerShown] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [highlightedOptions, setHighlightedOptions] = useState([]);
  const [currentText, setCurrentText] = useState(block.question);

  useEffect(() => {
    setAnswerShown(false);
    setHintUsed(false);
    setHighlightedOptions([]);
    setTimerStarted(false);
    setCurrentText(block.question);
  }, [block, setTimerStarted]);

  const handleForceStopInternal = () => {
    handleForceStop();
=======
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
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
  };

  const handleShowAnswerInternal = () => {
    handleShowAnswer();
<<<<<<< HEAD
    setAnswerShown(true);
    setCurrentText(block.text);

    const correctAnswerIndex = block.options.findIndex(
      (option) => option === block['correct answer']
    );

    const updatedOptions = block.options.map((option, index) => {
      if (index === correctAnswerIndex) {
        return '';
      }
      return styles.incorrectOption;
    });

    setHighlightedOptions(updatedOptions);
  };

  const handleHintInternal = () => {
    setHintUsed(true);

    const correctAnswerIndex = block.options.findIndex(
      (option) => option === block['correct answer']
    );

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * block.options.length);
    } while (randomIndex === correctAnswerIndex);

    const updatedOptions = block.options.map((option, index) => {
      if (index === correctAnswerIndex || index === randomIndex) {
        return '';
      }
      return styles.incorrectOption;
    });

    setHighlightedOptions(updatedOptions);
=======
    setAnswerShown(true); // Обновляем локальное состояние после показа ответа
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
  };

  const handleStartTimerInternal = () => {
    setTimerStarted(true);
<<<<<<< HEAD
  };

  const handleSelectCategoryInternal = () => {
    handleSelectCategory(block.categoryId, block.id);
=======
    setLocalTimerStarted(true);
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
  };

  if (!block) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.content}>
      <div className={styles.selectedInfo}>
<<<<<<< HEAD
        <span className={styles.infoCategoryName}>{categoryName}</span>
=======
        <span className={styles.infoCategoryName}>{block.categoryName || 'No Category'}</span>
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
        <div className={styles.selectedNumber}>{block.id + 1}</div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.selectionMode}>
<<<<<<< HEAD
          <div className={styles.question}>{currentText}</div>
          <div className={styles.options}>
            {block.options.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} ${highlightedOptions[index]}`}
              >
                {option}
              </div>
=======
          <div className={styles.question}>{block.question}</div>
          <div className={styles.options}>
            {block.options.map((option, index) => (
              <button key={index} className={styles.option}>
                {option}
              </button>
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
            ))}
          </div>
        </div>
      </div>
      <div className={styles.controlBlock}>
<<<<<<< HEAD
        {!timerStarted ? (
          <StartTimerButton onClick={handleStartTimerInternal} />
        ) : !timerEnded ? (
          <Timer
            key={block.id}
            duration={30}
            onEnd={handleTimerEnd}
            onForceStop={handleForceStopInternal}
          />
        ) : !answerShown ? (
          <div className={styles.buttonGroup}>
            <ShowAnswerButton onClick={handleShowAnswerInternal} />
            {!hintUsed && <HintButton onClick={handleHintInternal} />}
          </div>
        ) : (
          <SelectCategoryButton onClick={handleSelectCategoryInternal} />
=======
        {!localTimerStarted ? (
          <StartTimerButton onClick={handleStartTimerInternal} />
        ) : !timerEnded ? (
          <Timer duration={30} onEnd={handleTimerEnd} onForceStop={handleForceStopInternal} />
        ) : !answerShown ? (
          <ShowAnswerButton onClick={handleShowAnswerInternal} />
        ) : (
          <SelectCategoryButton onClick={handleSelectCategory} />
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
        )}
      </div>
    </div>
  );
}

export default SelectionMode;
