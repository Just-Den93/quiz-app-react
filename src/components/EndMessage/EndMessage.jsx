import React from 'react';
import styles from './EndMessage.module.css';
import { FaAward } from 'react-icons/fa';
import NewGameButton from '../NewGameButton/NewGameButton';
import MainMenuButton from '../MainMenuButton/MainMenuButton';

function EndMessage({ onNewGame, onMainMenu, currentQuizId, setQuizStates }) {
  
  const handleNewGame = () => {
    // Очищаем все данные текущей викторины в localStorage
    localStorage.removeItem(`data-${currentQuizId}`);
    localStorage.removeItem(`usedBlocks-${currentQuizId}`);
    localStorage.removeItem('quizStates');  // Очищаем состояние викторины в localStorage

    // Сбрасываем состояние викторины в контексте приложения
    setQuizStates((prevStates) => ({
      ...prevStates,
      [currentQuizId]: {
        usedBlocks: {},
        data: null,
      },
    }));

    // Вызываем переданную функцию для обработки новой игры
    onNewGame();
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
