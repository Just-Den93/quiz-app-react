import { useState } from 'react';

export function useModalLogic(block, onClose) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!block) {
    return {
      timerStarted: false,
      timerEnded: false,
      showAnswer: false,
      setTimerStarted: () => {},
      handleTimerEnd: () => {},
      handleShowAnswer: () => {},
      handleForceStop: () => {},
    };
  }

  const handleTimerEnd = () => {
    setTimerEnded(true);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
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
    handleSelectCategory: () => {},
    handleForceStop,
  };
}
