import { useState } from 'react';

export function useModalLogic(block, markBlockAsUsed, onClose) {
  // console.log('useModalLogic: block received:', block); // Логирование в начале функции

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!block) {
    // console.warn('useModalLogic: block is null or undefined'); 
    // Логирование, если block не определен
    return {
      timerStarted: false,
      timerEnded: false,
      showAnswer: false,
      setTimerStarted: () => {},
      handleTimerEnd: () => {},
      handleShowAnswer: () => {},
      handleSelectCategory: () => {},
      handleForceStop: () => {},
    };
  }

  const handleTimerEnd = () => {
    setTimerEnded(true);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleSelectCategory = () => {
    // console.log("handleSelectCategory called with:", block.categoryId, block.id); 
    // Логирование в handleSelectCategory
    markBlockAsUsed(block.categoryId, block.id);
    onClose();
  };

  const handleForceStop = () => {
    setTimerEnded(true);
    setShowAnswer(true);
  };

  return {
    timerStarted,
    timerEnded,
    showAnswer,
    setTimerStarted,
    handleTimerEnd,
    handleShowAnswer,
    handleSelectCategory,
    handleForceStop,
  };
}
