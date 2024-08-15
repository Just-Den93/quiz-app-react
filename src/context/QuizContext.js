import React, { createContext, useContext, useState } from 'react';

// Создаем контекст
const QuizContext = createContext();

// Хук для доступа к контексту
export function useQuizContext() {
  return useContext(QuizContext);
}

// Провайдер контекста
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

  const markBlockAsUsed = (quizId, categoryName, blockId) => {
    if (!categoryName) {
      console.error('categoryName не определено, невозможно отметить блок как используемый');
      return;
    }

    setQuizStates(prevStates => {
      const previousState = prevStates[quizId] || {};
      const updatedUsedBlocks = { ...previousState.usedBlocks };

      if (!updatedUsedBlocks[categoryName]) {
        updatedUsedBlocks[categoryName] = [];
      }

      if (!updatedUsedBlocks[categoryName].includes(blockId)) {
        updatedUsedBlocks[categoryName].push(blockId);
      }

      localStorage.setItem(`usedBlocks-${quizId}`, JSON.stringify(updatedUsedBlocks));

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
      markBlockAsUsed, // Убедитесь, что функция передается здесь
    }}>
      {children}
    </QuizContext.Provider>
  );
}
