import React from 'react';
import styles from './EndMessage.module.css';

function EndMessage() {
  return (
    <div id="end-message" className={styles.endMessage}>
      <div className={styles.endMessageContent}>
        <div className={styles.greetings}>Вітаю, ви завершили вікторину!</div>
        <div className={styles.restartCircle}>
          <img src="./images/award-svgrepo-com.svg" alt="Award" />
        </div>
        <button id="restart-button" className={styles.restartButton}>Почати знову</button>
      </div>
    </div>
  );
}

export default EndMessage;
