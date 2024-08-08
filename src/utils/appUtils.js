export const handleShowQuizPage = (setShowQuizPage) => {
  setShowQuizPage(true);
  localStorage.setItem('showQuizPage', 'true');
};

export const handleShowMainMenu = (setShowQuizPage) => {
  setShowQuizPage(false);
  localStorage.setItem('showQuizPage', 'false');
};

export const handleNewGame = (setShowQuizPage) => {
  localStorage.removeItem('usedBlocks');
  setShowQuizPage(false);
  setTimeout(() => {
    setShowQuizPage(true);
  }, 0);
};
