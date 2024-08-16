import React from 'react';
import styles from './Settings.module.css';

function Settings({ onClose }) {
  return (
    <div className={styles.settings}>
      <div className={styles.content}>
        <h2>Settings</h2>
        <p>Content for settings will be displayed here.</p>
      </div>
      <button className={styles.closeButton} onClick={onClose}>Close</button>
    </div>
  );
}

export default Settings;
