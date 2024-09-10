import React from 'react';
import styles from './MenuModal.module.css';
import { useMenuModal } from './menuModalUtils';
import { useQuizContext } from '../../context/QuizContext';
import NewGameButton from '../NewGameButton/NewGameButton';
import ContinueButton from '../ContinueButton/ContinueButton';
import SettingsButton from '../SettingsButton/SettingsButton';
import MainMenuButton from '../MainMenuButton/MainMenuButton';

function MenuModal({ showSettings, showMainMenu }) {
  const { isVisible, closeMenuModal } = useMenuModal();
  const { currentQuizId, setQuizStates } = useQuizContext();

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

    // Закрываем меню
    closeMenuModal();
  };

  return (
    <div
      id="menu-modal"
      className={styles.menuModal}
      style={{ display: isVisible ? 'flex' : 'none', opacity: isVisible ? 1 : 0 }}
    >
      <div className={styles.menuModalContent}>
        <NewGameButton onNewGame={handleNewGame} /> {/* Передаем обработчик для новой игры */}
        <ContinueButton onClick={closeMenuModal} />
        <SettingsButton onClick={showSettings} />
        <MainMenuButton onClick={showMainMenu} />
      </div>
    </div>
  );
}

export default MenuModal;
