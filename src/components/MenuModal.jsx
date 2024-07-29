import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/MenuModal.module.css';

function MenuModal({ showSettings, handleNewGame, showMainMenu }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      if (isVisible) {
        closeMenuModal();
      } else {
        showMenuModal();
      }
    }
  }, [isVisible]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const showMenuModal = () => {
    setIsVisible(true);
  };

  const closeMenuModal = () => {
    setIsVisible(false);
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
