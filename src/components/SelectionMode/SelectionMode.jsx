import React, { useState, useEffect } from 'react';
import StartTimerButton from '../StartTimerButton/StartTimerButton';
import Timer from '../Timer/Timer';
import SelectCategoryButton from '../SelectCategoryButton/SelectCategoryButton';
import ShowAnswerButton from '../ShowAnswerButton/ShowAnswerButton';
import HintButton from '../HintButton/HintButton';
import styles from './SelectionMode.module.css';

function SelectionMode({
  block,
  categoryName,
  showAnswer,
  setTimerStarted,
  timerStarted,
  timerEnded,
  handleTimerEnd,
  handleShowAnswer,
  handleSelectCategory,
  handleForceStop,
}) {
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
  };

  const handleShowAnswerInternal = () => {
    handleShowAnswer();
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
  };

  const handleStartTimerInternal = () => {
    setTimerStarted(true);
  };

  const handleSelectCategoryInternal = () => {
    handleSelectCategory(block.categoryId, block.id);
  };

  if (!block) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.content}>
      <div className={styles.selectedInfo}>
        <span className={styles.infoCategoryName}>{categoryName}</span>
        <div className={styles.selectedNumber}>{block.id + 1}</div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.selectionMode}>
          <div className={styles.question}>{currentText}</div>
          <div className={styles.options}>
            {block.options.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} ${highlightedOptions[index]}`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.controlBlock}>
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
        )}
      </div>
    </div>
  );
}

export default SelectionMode;
