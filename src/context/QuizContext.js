import React, { createContext, useContext, useState, useEffect } from 'react';

const QuizContext = createContext();

export function useQuizContext() {
  return useContext(QuizContext);
}

export function QuizProvider({ children }) {
  const [showQuizPage, setShowQuizPage] = useState(() => {
    return JSON.parse(localStorage.getItem('showQuizPage')) || false;
  });
  const [selectedMode, setSelectedMode] = useState(null);
  const [currentQuizId, setCurrentQuizId] = useState(() => {
    return localStorage.getItem('currentQuizId');
  });
  const [quizStates, setQuizStates] = useState(() => {
    return JSON.parse(localStorage.getItem('quizStates')) || {};
  });

  useEffect(() => {
    localStorage.setItem('showQuizPage', JSON.stringify(showQuizPage));
  }, [showQuizPage]);

  useEffect(() => {
    localStorage.setItem('currentQuizId', currentQuizId);
  }, [currentQuizId]);

  useEffect(() => {
    localStorage.setItem('quizStates', JSON.stringify(quizStates));
  }, [quizStates]);

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
      setQuizStates, // Добавляем setQuizStates в контекст
      updateQuizState,
      markBlockAsUsed,
    }}>
      {children}
    </QuizContext.Provider>
  );
}
