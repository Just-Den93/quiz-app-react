import React from 'react';
import styles from '../styles/MenuModal.module.css';
import { useMenuModal } from '../utils/menuModalUtils';

function MenuModal({ showSettings, handleNewGame, showMainMenu }) {
  const { isVisible, showMenuModal, closeMenuModal } = useMenuModal();

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
