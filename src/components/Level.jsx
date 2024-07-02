import React from 'react';
import styles from '../styles/Level.module.css';

function Level({ id, level }) {
  return (
    <div id={id} className={styles.level}>
      {level}
    </div>
  );
}

export default Level;
