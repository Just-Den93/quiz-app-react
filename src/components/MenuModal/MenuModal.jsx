import React from 'react';
import styles from './MenuModal.module.css';
import { useMenuModal } from './menuModalUtils';
import { useQuizContext } from '../../context/QuizContext';

function MenuModal({ showSettings, showMainMenu }) {
  const { isVisible, closeMenuModal } = useMenuModal();
  const { currentQuizId, setQuizStates, setSelectedMode } = useQuizContext();

  const handleNewGame = () => {
    // Очищаем данные текущей викторины в localStorage
    localStorage.removeItem(`data-${currentQuizId}`);
    localStorage.removeItem('currentQuizId');

    // Очищаем состояние в контексте
    setQuizStates(prevStates => ({
      ...prevStates,
      [currentQuizId]: undefined,
    }));

    // Закрываем меню и сбрасываем режим
    setSelectedMode(null);
    closeMenuModal();
  };

  return (
    <div
      id="menu-modal"
      className={styles.menuModal}
      style={{ display: isVisible ? 'flex' : 'none', opacity: isVisible ? 1 : 0 }}
    >
      <div className={styles.menuModalContent}>
        <button id="new-game-button" className={styles.menuButton} onClick={handleNewGame}>
          Нова гра
        </button>
        <button id="continue-button" className={styles.menuButton} onClick={closeMenuModal}>
          Продовжити
        </button>
        <button id="settings-button" className={styles.menuButton} onClick={showSettings}>
          Налаштування
        </button>
        <button id="main-menu-button" className={styles.menuButton} onClick={showMainMenu}>
          Головне меню
        </button>
      </div>
    </div>
  );
}

export default MenuModal;
