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
  const [usedBlocks, setUsedBlocks] = useState(() => {
    const saved = localStorage.getItem('usedBlocks');
    return saved ? JSON.parse(saved) : {};
  });

  return (
    <QuizContext.Provider value={{
      showQuizPage,
      setShowQuizPage,
      selectedMode,
      setSelectedMode,
      usedBlocks,
      setUsedBlocks
    }}>
      {children}
    </QuizContext.Provider>
  );
}
