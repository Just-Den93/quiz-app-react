import React, { useEffect, useState } from 'react';
import styles from '../styles/MenuModal.module.css';

function MenuModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isVisible) {
          closeMenuModal();
        } else {
          showMenuModal();
        }
      }
    };

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
    localStorage.clear();
    closeMenuModal();
    window.location.reload();
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
      </div>
    </div>
  );
}

export default MenuModal;
