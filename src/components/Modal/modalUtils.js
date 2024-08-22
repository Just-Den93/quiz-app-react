import { useState } from 'react';

<<<<<<< HEAD
export function useModalLogic(block, markBlockAsUsed, onClose) {
  // console.log('useModalLogic: block received:', block); // Логирование в начале функции

=======
export function useModalLogic(block, onClose) {
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!block) {
<<<<<<< HEAD
    // console.warn('useModalLogic: block is null or undefined'); 
    // Логирование, если block не определен
=======
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
    return {
      timerStarted: false,
      timerEnded: false,
      showAnswer: false,
      setTimerStarted: () => {},
      handleTimerEnd: () => {},
      handleShowAnswer: () => {},
<<<<<<< HEAD
      handleSelectCategory: () => {},
=======
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
      handleForceStop: () => {},
    };
  }

  const handleTimerEnd = () => {
    setTimerEnded(true);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

<<<<<<< HEAD
  const handleSelectCategory = () => {
    // console.log("handleSelectCategory called with:", block.categoryId, block.id); 
    // Логирование в handleSelectCategory
    markBlockAsUsed(block.categoryId, block.id);
    onClose();
  };

=======
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
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
<<<<<<< HEAD
    handleSelectCategory,
=======
    handleSelectCategory: () => {},
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
    handleForceStop,
  };
}
