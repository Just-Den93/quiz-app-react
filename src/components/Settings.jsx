// src/components/Settings.jsx
import React, { useState } from 'react';
import styles from '../styles/Settings.module.css';

function Settings({ onClose, selectedMode, setSelectedMode }) {
  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.sidebar}>
        <button className={styles.switchButton}>Режим</button>
        <button className={styles.switchButton}>Switch 2</button>
        <button className={styles.switchButton}>Switch 3</button>
      </div>
      <div className={styles.content}>
        <h2>Choose Mode</h2>
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              value="QAMode"
              checked={selectedMode === "QAMode"}
              onChange={handleModeChange}
            />
            QAMode
          </label>
          <label>
            <input
              type="radio"
              value="SelectionMode"
              checked={selectedMode === "SelectionMode"}
              onChange={handleModeChange}
            />
            SelectionMode
          </label>
        </div>
      </div>
      <button className={styles.closeButton} onClick={onClose}>Close</button>
    </div>
  );
}

export default Settings;
