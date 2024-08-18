import React, { useState, useEffect, useMemo } from 'react';
import Header from '../Header/Header';
import ContentContainer from '../ContentContainer/ContentContainer';
import EndMessage from '../EndMessage/EndMessage';
import MenuModal from '../MenuModal/MenuModal';
import Modal from '../Modal/Modal';
import Settings from '../Settings/Settings';
import styles from './QuizPage.module.css';
import { useQuizContext } from '../../context/QuizContext';
import { loadJsonDataByMode } from '../../utils/loadJsonData';
import { useModalLogic } from '../Modal/modalUtils';

function QuizPage() {
  const { quizStates, updateQuizState, setShowQuizPage, selectedMode, currentQuizId, setQuizStates } = useQuizContext();

  const currentQuizState = useMemo(() => quizStates[currentQuizId] || {}, [quizStates, currentQuizId]);
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem(`data-${currentQuizId}`);
    return storedData ? JSON.parse(storedData) : currentQuizState.data || null;
  });
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);

  useEffect(() => {
    if (!data && currentQuizId && selectedMode) {
      const selectedData = loadJsonDataByMode(selectedMode);
      if (selectedData) {
        setData(selectedData.categories);
        updateQuizState(currentQuizId, { data: selectedData.categories });
        localStorage.setItem(`data-${currentQuizId}`, JSON.stringify(selectedData.categories));
      }
    }
  }, [data, currentQuizId, selectedMode, currentQuizState, updateQuizState]);

  const handleBlockSelect = (block) => {
    setSelectedBlock(block);
  };

  const handleCloseModal = () => {
    setSelectedBlock(null);
  };

  const handleNewGame = () => {
    // Очистка localStorage
    localStorage.clear();

    // Сброс состояния в контексте
    setQuizStates({});
    setSelectedBlock(null);

    // Обновляем данные (вместо перехода в App)
    const selectedData = loadJsonDataByMode(selectedMode);
    if (selectedData) {
      setData(selectedData.categories);
      updateQuizState(currentQuizId, { data: selectedData.categories });
      localStorage.setItem(`data-${currentQuizId}`, JSON.stringify(selectedData.categories));
    }
  };

  const modalLogic = useModalLogic(selectedBlock, handleCloseModal);

  return (
    <div className={styles.quiz_page}>
      <Header />
      {data ? (
        <>
          <ContentContainer data={data} onBlockSelect={handleBlockSelect} />
          {selectedBlock && (
            <Modal
              block={selectedBlock}
              onClose={handleCloseModal}
              {...modalLogic}
              selectedMode={selectedMode}
            />
          )}
        </>
      ) : (
        <div>Loading data...</div>
      )}
      <EndMessage />
      <MenuModal
        showSettings={() => setIsSettingsVisible(true)}
        handleNewGame={handleNewGame}
        showMainMenu={() => setShowQuizPage(false)}
      />
      {isSettingsVisible && <Settings onClose={() => setIsSettingsVisible(false)} />}
    </div>
  );
}

export default QuizPage;
