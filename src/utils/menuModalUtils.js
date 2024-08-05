import { useState, useCallback, useEffect } from 'react';

export function useMenuModal() {
  const [isVisible, setIsVisible] = useState(false);

  const showMenuModal = () => {
    setIsVisible(true);
  };

  const closeMenuModal = () => {
    setIsVisible(false);
  };

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      if (isVisible) {
        closeMenuModal();
      } else {
        showMenuModal();
      }
    }
  }, [isVisible]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    isVisible,
    showMenuModal,
    closeMenuModal,
  };
}
