import React from 'react';
import styles from './Level.module.css';

function Level({ id, level }) {
  return (
    <div id={id} className={styles.level}>
      {level}
    </div>
  );
}

export default Level;
