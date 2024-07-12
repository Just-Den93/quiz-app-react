// src/components/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import ContentContainer from './ContentContainer';
import EndMessage from './EndMessage';
import MenuModal from './MenuModal';
import Settings from './Settings';
import styles from '../styles/App.module.css';

function App() {
  const [usedBlocks, setUsedBlocks] = useState(() => {
    const saved = localStorage.getItem('usedBlocks');
    return saved ? JSON.parse(saved) : {};
  });

  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [selectedMode, setSelectedMode] = useState(() => {
    const savedMode = localStorage.getItem('selectedMode');
    return savedMode ? savedMode : 'QAMode';
  });

  const markBlockAsUsed = (categoryId, blockId) => {
    setUsedBlocks((prevUsedBlocks) => {
      const updatedUsedBlocks = { ...prevUsedBlocks };
      if (!updatedUsedBlocks[categoryId]) {
        updatedUsedBlocks[categoryId] = [];
      }
      updatedUsedBlocks[categoryId].push(blockId);

      localStorage.setItem('usedBlocks', JSON.stringify(updatedUsedBlocks));
      return updatedUsedBlocks;
    });
  };

  useEffect(() => {
    localStorage.setItem('usedBlocks', JSON.stringify(usedBlocks));
  }, [usedBlocks]);

  useEffect(() => {
    localStorage.setItem('selectedMode', selectedMode);
  }, [selectedMode]);

  const showSettings = () => {
    setIsSettingsVisible(true);
  };

  const hideSettings = () => {
    setIsSettingsVisible(false);
  };

  const handleNewGame = () => {
    localStorage.removeItem('usedBlocks');
    setUsedBlocks({});
    window.location.reload();
  };

  return (
    <div className={styles.app}>
      <Header />
      <ContentContainer usedBlocks={usedBlocks} markBlockAsUsed={markBlockAsUsed} selectedMode={selectedMode} />
      <EndMessage />
      <MenuModal showSettings={showSettings} handleNewGame={handleNewGame} />
      {isSettingsVisible && (
        <Settings
          onClose={hideSettings}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
        />
      )}
    </div>
  );
}

export default App;
