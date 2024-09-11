import React, { useState, useEffect } from 'react';
import StartTimerButton from '../ButtonComponents/StartTimerButton/StartTimerButton';
import Timer from '../Timer/Timer';
import SelectCategoryButton from '..//ButtonComponents/SelectCategoryButton/SelectCategoryButton';
import ShowAnswerButton from '../ButtonComponents/ShowAnswerButton/ShowAnswerButton';
import HintButton from '../ButtonComponents/HintButton/HintButton';
import styles from './SelectionMode.module.css';
import {
  formatTextWithHighlights,
  getOptionFontSize,
  getAnswerFontSize,
  handleForceStopInternal,
  handleShowAnswerInternal,
  handleHintInternal,
} from './SelectionModeUtils';

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
  const [forceStopped, setForceStopped] = useState(false);

  useEffect(() => {
    setAnswerShown(false);
    setHintUsed(false);
    setHighlightedOptions([]);
    setTimerStarted(false);
  }, [block, setTimerStarted]);

  return (
    <div className={styles.content}>
      <div className={styles.selectedInfo}>
        <span className={styles.infoCategoryName}>{categoryName}</span>
        <div className={styles.selectedNumber}>{block.id + 1}</div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.selectionMode}>
          {answerShown ? (
            <div className={styles.question} style={{ fontSize: `${getAnswerFontSize(block.text)}px` }}>
              {formatTextWithHighlights(block.text)}
            </div>
          ) : (
            <div className={styles.question}>{block.question}</div>
          )}
          <div className={styles.options}>
            {block.options.map((option, index) => (
              <div key={index} className={`${styles.option} ${highlightedOptions[index]}`} style={{ fontSize: `${getOptionFontSize(option)}px` }}>
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.controlBlock}>
        <div className={styles.timerSpace}>
          {!timerStarted ? (
            <StartTimerButton onClick={() => setTimerStarted(true)} />
          ) : !timerEnded ? (
            <Timer
              key={block.id}
              duration={30}
              onEnd={handleTimerEnd}
              onForceStop={() => handleForceStopInternal(handleForceStop, setForceStopped)}
            />
          ) : !answerShown ? (
            <div className={styles.buttonGroup}>
              <ShowAnswerButton onClick={() => handleShowAnswerInternal(block, styles, handleShowAnswer, setAnswerShown, setHighlightedOptions)} />
              {!hintUsed && <HintButton onClick={() => handleHintInternal(block, styles, setHintUsed, setHighlightedOptions)} />}
            </div>
          ) : (
            <SelectCategoryButton onClick={() => handleSelectCategory(block.categoryId, block.id)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectionMode;
