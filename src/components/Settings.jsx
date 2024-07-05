import React from 'react';
import styles from '../styles/Settings.module.css';

function Settings({ onClose }) {
  return (
    <div className={styles.settings}>
      <div className={styles.sidebar}>
        <button className={styles.switchButton}>Switch 1</button>
        <button className={styles.switchButton}>Switch 2</button>
        <button className={styles.switchButton}>Switch 3</button>
      </div>
      <div className={styles.content}>
        <h2>Settings Content</h2>
        <p>Content for settings will be displayed here.</p>
      </div>
      <button className={styles.closeButton} onClick={onClose}>Close</button>
    </div>
  );
}

export default Settings;
