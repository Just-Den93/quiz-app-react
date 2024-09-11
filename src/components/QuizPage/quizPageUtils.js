// src/utils/quizPageUtils.js

// Подсчет общего количества блоков
export const getTotalBlocks = (data) => {
  return data?.reduce((acc, category) => acc + category.blocks.length, 0) || 0;
};

// Подсчет количества использованных блоков
export const getUsedBlocksCount = (currentQuizState) => {
  return Object.values(currentQuizState.usedBlocks || {}).reduce(
    (acc, categoryBlocks) => acc + categoryBlocks.length,
    0
  );
};

// Обработка выбора блока
export const handleBlockSelect = (
  block, category, currentQuizState, setSelectedBlock, setSelectedCategory, setIsBlockUsed
) => {
  setSelectedBlock(block);
  setSelectedCategory(category);

  if (currentQuizState.usedBlocks?.[category.id]?.includes(block.id)) {
    setIsBlockUsed(true); // Блок уже использован
  } else {
    setIsBlockUsed(false); // Блок не использован
  }
};

// Обработка закрытия модального окна
export const handleCloseModal = (setSelectedBlock, setSelectedCategory, setIsBlockUsed) => {
  setSelectedBlock(null);
  setSelectedCategory(null);
  setIsBlockUsed(false); // Сброс состояния
};

// Обработка завершения игры
export const handleNewGame = (currentQuizId, setQuizStates, setConfettiRunning, setShowEndMessage) => {
  localStorage.removeItem(`data-${currentQuizId}`);
  localStorage.removeItem(`usedBlocks-${currentQuizId}`);
  localStorage.removeItem('quizStates');

  setQuizStates((prevStates) => ({
    ...prevStates,
    [currentQuizId]: {
      usedBlocks: {},
      data: null,
    },
  }));

  setConfettiRunning(false);
  setShowEndMessage(false);
};

// Обработка возврата в главное меню
export const handleMainMenu = (
  currentQuizId, setQuizStates, setShowQuizPage, setConfettiRunning, clearState = false
) => {
  if (clearState) {
    localStorage.removeItem(`data-${currentQuizId}`);
    setQuizStates((prevStates) => ({
      ...prevStates,
      [currentQuizId]: {
        usedBlocks: {},
        data: null,
      },
    }));
  }
  setShowQuizPage(false);
  setConfettiRunning(false);
};

// Обработка выбора категории и запуска конфетти
export const handleSelectCategory = (
  categoryId, blockId, currentQuizId, markBlockAsUsed, totalBlocks, usedBlocksCount, setConfettiRunning, setShowEndMessage, handleCloseModal
) => {
  markBlockAsUsed(currentQuizId, categoryId, blockId);

  if (usedBlocksCount === totalBlocks - 1) {
    setConfettiRunning(true);
    setShowEndMessage(true);
  }

  handleCloseModal();
};
