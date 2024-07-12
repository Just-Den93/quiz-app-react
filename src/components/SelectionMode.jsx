// src/components/SelectionMode.jsx
import React, { useState } from 'react';
import styles from '../styles/SelectionMode.module.css';

const SelectionMode = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const question = "Lorem ipsum dolor sit amet, consectetur adipiscing elit?";
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

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
