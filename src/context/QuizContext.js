import React, { createContext, useContext, useState, useEffect } from 'react';
<<<<<<< HEAD
import { loadJsonDataByMode } from '../utils/loadJsonData';
=======
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe

const QuizContext = createContext();

export function useQuizContext() {
  return useContext(QuizContext);
}

export function QuizProvider({ children }) {
  const [showQuizPage, setShowQuizPage] = useState(() => {
<<<<<<< HEAD
    const savedState = localStorage.getItem('showQuizPage');
    return savedState === 'true';
  });
  const [selectedMode, setSelectedMode] = useState(() => {
    const mode = localStorage.getItem('selectedMode');
    return mode;
  });
=======
    return JSON.parse(localStorage.getItem('showQuizPage')) || false;
  });
  const [selectedMode, setSelectedMode] = useState(null);
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
  const [currentQuizId, setCurrentQuizId] = useState(() => {
    return localStorage.getItem('currentQuizId');
  });
  const [quizStates, setQuizStates] = useState(() => {
<<<<<<< HEAD
    const savedStates = localStorage.getItem('quizStates');
    return savedStates ? JSON.parse(savedStates) : {};
  });
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('data');
    return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
    if (selectedMode && currentQuizId && !data) {
      const selectedData = loadJsonDataByMode(selectedMode);
      if (selectedData) {
        setData(selectedData.categories);
        updateQuizState(currentQuizId, { data: selectedData.categories });
        localStorage.setItem('data', JSON.stringify(selectedData.categories));
      }
    }
  }, [selectedMode, currentQuizId, data]);

  useEffect(() => {
    if (selectedMode !== null) {
      localStorage.setItem('selectedMode', selectedMode);
    }
  }, [selectedMode]);

  const updateQuizState = (uuid, newState) => {
    setQuizStates(prevStates => {
      const updatedStates = {
        ...prevStates,
        [uuid]: {
          ...prevStates[uuid],
          ...newState,
        },
      };
      localStorage.setItem('quizStates', JSON.stringify(updatedStates));
      return updatedStates;
    });
  };

  const markBlockAsUsed = (quizId, categoryId, blockId) => {
    if (!categoryId) {
      console.error('categoryId не определен, невозможно отметить блок как используемый');
      return;
    }

    setQuizStates(prevStates => {
      const previousState = prevStates[quizId] || {};
      const updatedUsedBlocks = { ...previousState.usedBlocks };

      if (!updatedUsedBlocks[categoryId]) {
        updatedUsedBlocks[categoryId] = [];
      }

      if (!updatedUsedBlocks[categoryId].includes(blockId)) {
        updatedUsedBlocks[categoryId].push(blockId);
      }

      const updatedStates = {
=======
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
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
        ...prevStates,
        [quizId]: {
          ...previousState,
          usedBlocks: updatedUsedBlocks,
        },
      };
<<<<<<< HEAD

      localStorage.setItem('quizStates', JSON.stringify(updatedStates));
      localStorage.setItem(`usedBlocks-${quizId}`, JSON.stringify(updatedUsedBlocks));

      return updatedStates;
=======
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
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
<<<<<<< HEAD
      updateQuizState,
      markBlockAsUsed,
      data,
=======
      setQuizStates, // Добавляем setQuizStates в контекст
      updateQuizState,
      markBlockAsUsed,
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
    }}>
      {children}
    </QuizContext.Provider>
  );
}
