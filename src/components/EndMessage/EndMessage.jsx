import React from 'react';
import styles from './EndMessage.module.css';
import { FaAward } from 'react-icons/fa';
import NewGameButton from '../ButtonComponents/NewGameButton/NewGameButton';
import MainMenuButton from '../ButtonComponents/MainMenuButton/MainMenuButton';
import { resetQuizState } from './EndMessageUtils';

function EndMessage({ onNewGame, onMainMenu, currentQuizId, setQuizStates }) {
  
  const handleNewGame = () => {
    resetQuizState(currentQuizId, setQuizStates); // Используем вынесенную функцию
    onNewGame(); // Вызываем переданную функцию для обработки новой игры
  };

  return (
    <div id="end-message" className={styles.endMessage}>
      <div className={styles.endMessageContent}>
        <div className={styles.greetings}>Вітаю, ви завершили вікторину!</div>
        <div className={styles.awardIconContainer}>
          <FaAward className={styles.awardIcon} />
        </div>
        <div className={styles.buttons}>
          <NewGameButton onNewGame={handleNewGame} />
          <MainMenuButton onMainMenu={onMainMenu} />
        </div>
      </div>
    </div>
  );
}

export default EndMessage;
