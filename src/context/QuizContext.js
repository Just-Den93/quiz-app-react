import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export function useQuizContext() {
  return useContext(QuizContext);
}

export function QuizProvider({ children }) {
  const [showQuizPage, setShowQuizPage] = useState(() => {
    const savedState = localStorage.getItem('showQuizPage');
    return savedState === 'true';
  });
  const [selectedMode, setSelectedMode] = useState(null);
  const [currentQuizId, setCurrentQuizId] = useState(null);
  const [quizStates, setQuizStates] = useState({});
  
  const updateQuizState = (uuid, newState) => {
    setQuizStates(prevStates => ({
      ...prevStates,
      [uuid]: {
        ...prevStates[uuid],
        ...newState,
      },
    }));
  };

  const markBlockAsUsed = (quizId, categoryId, blockId) => {
    setQuizStates(prevStates => {
      const previousState = prevStates[quizId] || {};
      const updatedUsedBlocks = {
        ...previousState.usedBlocks,
        [categoryId]: [...(previousState.usedBlocks?.[categoryId] || []), blockId],
      };

      return {
        ...prevStates,
        [quizId]: {
          ...previousState,
          usedBlocks: updatedUsedBlocks,
        },
      };
    });
  };

  return (
    <QuizContext.Provider value={{
      showQuizPage,
      setShowQuizPage,
      selectedMode,
      setSelectedMode,
      currentQuizId,
      setCurrentQuizId,
      quizStates,
      updateQuizState,
      markBlockAsUsed,
    }}>
      {children}
    </QuizContext.Provider>
  );
}
