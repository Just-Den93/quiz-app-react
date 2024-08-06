import React, { useState } from 'react';
import styles from '../styles/SelectionMode.module.css';

const SelectionMode = ({ question, options }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.selectionMode}>
        <div className={styles.question}>{question}</div>
        <div className={styles.options}>
          {options.map((option, index) => (
            <button
              key={index}
              className={`${styles.option} ${selectedOption === option ? styles.selected : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectionMode;
