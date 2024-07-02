import React from 'react';
import styles from '../styles/MenuModal.module.css';

function MenuModal() {
  return (
    <div id="menu-modal" className={styles.menuModal}>
      <div className={styles.menuModalContent}>
        <button id="new-game-button" className={styles.menuButton}>Нова гра</button>
        <button id="continue-button" className={styles.menuButton}>Продовжити</button>
      </div>
    </div>
  );
}

export default MenuModal;
