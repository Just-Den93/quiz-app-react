import React from 'react';
import styles from './MenuModal.module.css';
import { useMenuModal, resetQuizStateAndCloseModal } from './menuModalUtils';
import { useQuizContext } from '../../context/QuizContext';
import NewGameButton from '../ButtonComponents/NewGameButton/NewGameButton';
import ContinueButton from '../ButtonComponents/ContinueButton/ContinueButton';
import SettingsButton from '../ButtonComponents/SettingsButton/SettingsButton';
import MainMenuButton from '../ButtonComponents/MainMenuButton/MainMenuButton';

function MenuModal({ showSettings, showMainMenu }) {
  const { isVisible, closeMenuModal } = useMenuModal();
  const { currentQuizId, setQuizStates } = useQuizContext();

  return (
    <div
      id="menu-modal"
      className={styles.menuModal}
      style={{ display: isVisible ? 'flex' : 'none', opacity: isVisible ? 1 : 0 }}
    >
      <div className={styles.menuModalContent}>
        <NewGameButton 
          onNewGame={() => resetQuizStateAndCloseModal(currentQuizId, setQuizStates, closeMenuModal)} // Используем вынесенную функцию
        />
        <ContinueButton onClick={closeMenuModal} />
        <SettingsButton onClick={showSettings} />
        <MainMenuButton onClick={showMainMenu} />
      </div>
    </div>
  );
}

export default MenuModal;
