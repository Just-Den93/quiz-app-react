import { setShowQuizPage } from '../store/actions';

export const handleShowQuizPage = (dispatch) => {
  console.log('Showing Quiz Page'); // Log when showing Quiz Page
  dispatch(setShowQuizPage(true));
  localStorage.setItem('showQuizPage', 'true');
};

export const handleShowMainMenu = (dispatch) => {
  console.log('Showing Main Menu'); // Log when showing Main Menu
  dispatch(setShowQuizPage(false));
  localStorage.setItem('showQuizPage', 'false');
};

export const handleNewGame = (dispatch) => {
  console.log('Starting New Game'); // Log when starting a new game
  localStorage.removeItem('usedBlocks');
  dispatch(setShowQuizPage(false));
  setTimeout(() => {
    dispatch(setShowQuizPage(true));
  }, 0);
};
