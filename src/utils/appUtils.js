export function handleShowQuizPage(setShowQuizPage) {
  setShowQuizPage(true);
  localStorage.setItem('showQuizPage', 'true');
}

export function handleShowMainMenu(setShowQuizPage) {
  setShowQuizPage(false);
  localStorage.setItem('showQuizPage', 'false');
}

export function handleNewGame(setShowQuizPage) {
  localStorage.removeItem('usedBlocks');
  setShowQuizPage(false);
  setTimeout(() => {
    setShowQuizPage(true);
  }, 0);
}
