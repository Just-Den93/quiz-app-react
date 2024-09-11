import React from 'react';
import styles from './WarningMessage.module.css';
import TryAgainButton from '../ButtonComponents/TryAgainButton/TryAgainButton';
import ContinueButton from '../ButtonComponents/ContinueButton/ContinueButton';
import { IoWarning } from "react-icons/io5";

function WarningMessage({ onTryAgain, onContinue }) {
  return (
    <div className={styles.warningMessage}>
      <div className={styles.warningMessageContent}>
        <div className={styles.warningText}>Бажаєте пройти ще раз?</div>
        <div className={styles.warningIconContainer}>
          <IoWarning className={styles.warningIcon} />
        </div>
        <div className={styles.buttons}>
          <TryAgainButton onClick={onTryAgain} />
          <ContinueButton onClick={onContinue} />
        </div>
      </div>
    </div>
  );
}

export default WarningMessage;
