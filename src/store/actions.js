// Действия для установки состояния викторины и отметки блока как использованного
export const setQuizState = (mode, state) => ({
  type: 'SET_QUIZ_STATE',
  payload: { mode, state },
});

export const markBlockAsUsed = (mode, categoryName, blockId) => ({
  type: 'MARK_BLOCK_AS_USED',
  payload: { mode, categoryName, blockId },
});
