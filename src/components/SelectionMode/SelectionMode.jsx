import React, { useState, useEffect } from 'react';
import StartTimerButton from '../StartTimerButton/StartTimerButton';
import Timer from '../Timer/Timer';
import SelectCategoryButton from '../SelectCategoryButton/SelectCategoryButton';
import ShowAnswerButton from '../ShowAnswerButton/ShowAnswerButton';
import HintButton from '../HintButton/HintButton';
import styles from './SelectionMode.module.css';


function SelectionMode({
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
  const [answerShown, setAnswerShown] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [highlightedOptions, setHighlightedOptions] = useState([]);


  // Сброс всех состояний при смене блока
  useEffect(() => {
    setAnswerShown(false);
    setHintUsed(false);
    setHighlightedOptions([]);
    setTimerStarted(false);
    console.log('SelectionMode initialized for block:', block.id);
  }, [block, setTimerStarted]);


  const handleForceStopInternal = () => {
    handleForceStop();
  };


  const handleShowAnswerInternal = () => {
    handleShowAnswer();
    setAnswerShown(true);


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


  if (!block) {
    return <div>Loading...</div>;
  }


  return (
    <div className={styles.content}>
      <div className={styles.selectedInfo}>
        <span className={styles.infoCategoryName}>
          {block.categoryName || 'No Category'}
        </span>
        <div className={styles.selectedNumber}>{block.id + 1}</div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.selectionMode}>
          <div className={styles.question}>{block.question}</div>
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
            key={block.id} // Use block ID to ensure Timer remounts with each new block
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
          <SelectCategoryButton onClick={handleSelectCategory} />
        )}
      </div>
    </div>
  );
}


export default SelectionMode;
