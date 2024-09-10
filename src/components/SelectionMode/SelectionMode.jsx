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

  useEffect(() => {
    setAnswerShown(false);
    setHintUsed(false);
    setHighlightedOptions([]);
    setTimerStarted(false);
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

  const handleSelectCategoryInternal = () => {
    handleSelectCategory(block.categoryId, block.id); // Сообщаем QuizPage о нажатии кнопки
  };

  // Функция для определения размера шрифта в зависимости от длины текста
  const getOptionFontSize = (text) => {
    const length = text.length;
    if (length <= 10) {
      return 25;
    } else if (length <= 22) {
      return 22;
    } else if (length >= 100) {
      return 16;
    } else {
      return 18;
    }
  };

  // Функция для определения размера шрифта для ответа
  const getAnswerFontSize = (text) => {
    const length = text.length;
    if (length <= 90) {
      return 22;
    } else if (length <= 110) {
      return 20;
    } else {
      return 18;
    }
  };

  // Форматирование текста с подсветкой в бэктиках
  const formatTextWithHighlights = (text) => {
    const regex = /`([^`]+)`/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (lastIndex < match.index) {
        parts.push(<span key={lastIndex}>{text.slice(lastIndex, match.index)}</span>);
      }
      parts.push(
        <span key={match.index} style={{ backgroundColor: '#e21b3c', color: 'white', padding: '0 4px' }}>
          {match[1]}
        </span>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
    }

    return parts;
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
    </div>
  );
}

export default SelectionMode;
