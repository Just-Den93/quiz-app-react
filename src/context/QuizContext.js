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

  const markBlockAsUsed = (quizId, categoryId, blockId) => {
    if (!categoryId) {
        console.error('categoryId не определен, невозможно отметить блок как используемый');
        return;
    }

    // Логируем перед обновлением
    console.log(`markBlockAsUsed called with: quizId=${quizId}, categoryId=${categoryId}, blockId=${blockId}`);

    setQuizStates(prevStates => {
        const previousState = prevStates[quizId] || {};
        const updatedUsedBlocks = { ...previousState.usedBlocks };

        if (!updatedUsedBlocks[categoryId]) {
            updatedUsedBlocks[categoryId] = [];
        }

        if (!updatedUsedBlocks[categoryId].includes(blockId)) {
            updatedUsedBlocks[categoryId].push(blockId);
        }

        console.log('Updated usedBlocks:', updatedUsedBlocks);  // Логируем новое состояние

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
      markBlockAsUsed,
    }}>
      {children}
    </QuizContext.Provider>
  );
}
