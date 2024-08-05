import { useState } from 'react';

export function useModalLogic(block, markBlockAsUsed, onClose) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!block) {
    return null;
  }

  const handleTimerEnd = () => {
    setTimerEnded(true);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleSelectCategory = () => {
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
