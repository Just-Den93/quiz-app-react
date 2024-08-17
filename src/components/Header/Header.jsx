import React from 'react';
import Level from '../Level/Level';
import styles from './Header.module.css';

function Header() {
  return (
    <div className={styles.header}>
      <Level id="light" level="Легкий рівень" />
      <Level id="medium" level="Середній рівень" />
      <Level id="heavy" level="Важкий рівень" />
    </div>
  );
}

export default Header;
