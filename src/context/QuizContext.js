import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadJsonDataByMode } from '../utils/loadJsonData';

const QuizContext = createContext();

export function useQuizContext() {
  return useContext(QuizContext);
}

export function QuizProvider({ children }) {
  const [showQuizPage, setShowQuizPage] = useState(() => {
    const savedState = localStorage.getItem('showQuizPage');
    return savedState === 'true';
  });
  const [selectedMode, setSelectedMode] = useState(() => {
    const mode = localStorage.getItem('selectedMode');
    return mode;
  });
  const [currentQuizId, setCurrentQuizId] = useState(() => {
    return localStorage.getItem('currentQuizId');
  });
  const [quizStates, setQuizStates] = useState(() => {
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
        ...prevStates,
        [quizId]: {
          ...previousState,
          usedBlocks: updatedUsedBlocks,
        },
      };

      localStorage.setItem('quizStates', JSON.stringify(updatedStates));
      localStorage.setItem(`usedBlocks-${quizId}`, JSON.stringify(updatedUsedBlocks));

      return updatedStates;
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
      data,
    }}>
      {children}
    </QuizContext.Provider>
  );
}
