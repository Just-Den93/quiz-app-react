import { useState, useEffect } from 'react';

export function useQuizPageLogic() {
  const [usedBlocks, setUsedBlocks] = useState(() => {
    const saved = localStorage.getItem('usedBlocks');
    return saved ? JSON.parse(saved) : {};
  });

  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const markBlockAsUsed = (categoryName, blockId) => {
    setUsedBlocks((prevUsedBlocks) => {
      const updatedUsedBlocks = { ...prevUsedBlocks };
      if (!updatedUsedBlocks[categoryName]) {
        updatedUsedBlocks[categoryName] = [];
      }
      updatedUsedBlocks[categoryName].push(blockId);

      localStorage.setItem('usedBlocks', JSON.stringify(updatedUsedBlocks));
      return updatedUsedBlocks;
    });
  };

  useEffect(() => {
    localStorage.setItem('usedBlocks', JSON.stringify(usedBlocks));
  }, [usedBlocks]);

  const showSettings = () => {
    setIsSettingsVisible(true);
  };

  const hideSettings = () => {
    setIsSettingsVisible(false);
  };

  return {
    usedBlocks,
    isSettingsVisible,
    markBlockAsUsed,
    showSettings,
    hideSettings,
  };
}
