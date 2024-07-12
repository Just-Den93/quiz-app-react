// src/components/MenuModal.jsx
import React, { useState, useEffect } from 'react';
import styles from '../styles/MenuModal.module.css';

function MenuModal({ showSettings, resetGame }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      if (isVisible) {
        closeMenuModal();
      } else {
        showMenuModal();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  const showMenuModal = () => {
    setIsVisible(true);
  };

  const closeMenuModal = () => {
    setIsVisible(false);
  };

  const handleNewGame = () => {
    resetGame();
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
      </div>
    </div>
  );
}

export default MenuModal;
