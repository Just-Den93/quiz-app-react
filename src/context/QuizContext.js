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
  const [usedBlocks, setUsedBlocks] = useState({}); // Новое состояние для использованных блоков

  const updateQuizState = (uuid, newState) => {
    setQuizStates(prevStates => ({
      ...prevStates,
      [uuid]: {
        ...prevStates[uuid],
        ...newState,
      },
    }));
  };

  const markBlockAsUsed = (categoryId, blockId) => {
    setUsedBlocks(prevState => ({
      ...prevState,
      [categoryId]: [...(prevState[categoryId] || []), blockId],
    }));
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
      usedBlocks,
      markBlockAsUsed,
    }}>
      {children}
    </QuizContext.Provider>
  );
}
