import React from 'react';
import styles from '../styles/Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.tab}>
        <span className={styles.tabText}>Бібліотека</span>
      </div>
    </div>
  );
}

export default Sidebar;
