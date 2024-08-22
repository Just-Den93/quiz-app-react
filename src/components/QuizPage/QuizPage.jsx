<<<<<<< HEAD
import React, { useState, useMemo } from 'react';
=======
import React, { useState, useEffect, useMemo } from 'react';
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
import Header from '../Header/Header';
import ContentContainer from '../ContentContainer/ContentContainer';
import EndMessage from '../EndMessage/EndMessage';
import MenuModal from '../MenuModal/MenuModal';
import Modal from '../Modal/Modal';
import Settings from '../Settings/Settings';
import styles from './QuizPage.module.css';
import { useQuizContext } from '../../context/QuizContext';
<<<<<<< HEAD

function QuizPage() {
  const { quizStates, setShowQuizPage, currentQuizId, selectedMode, data, markBlockAsUsed } = useQuizContext();

  const currentQuizState = useMemo(() => quizStates[currentQuizId] || {}, [quizStates, currentQuizId]);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleBlockSelect = (block, category) => {
    setSelectedBlock(block);
    setSelectedCategory(category);
=======
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
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
  };

  const handleCloseModal = () => {
    setSelectedBlock(null);
<<<<<<< HEAD
    setSelectedCategory(null);
  };

  const handleSelectCategory = (categoryId, blockId) => {
    markBlockAsUsed(currentQuizId, categoryId, blockId);
    setSelectedBlock(null);
    setSelectedCategory(null);
  };

=======
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

>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
  return (
    <div className={styles.quiz_page}>
      <Header />
      {data ? (
        <>
<<<<<<< HEAD
          <ContentContainer
            data={data}
            onBlockSelect={handleBlockSelect}
            usedBlocks={currentQuizState.usedBlocks || {}}
          />
          {selectedBlock && (
            <Modal
              block={selectedBlock}
              categoryName={selectedCategory?.name}
              onClose={handleCloseModal}
              selectedMode={selectedMode}
              onSelectCategory={handleSelectCategory}
=======
          <ContentContainer data={data} onBlockSelect={handleBlockSelect} />
          {selectedBlock && (
            <Modal
              block={selectedBlock}
              onClose={handleCloseModal}
              {...modalLogic}
              selectedMode={selectedMode}
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
            />
          )}
        </>
      ) : (
<<<<<<< HEAD
        <div>No data available.</div>
=======
        <div>Loading data...</div>
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
      )}
      <EndMessage />
      <MenuModal
        showSettings={() => setIsSettingsVisible(true)}
<<<<<<< HEAD
=======
        handleNewGame={handleNewGame}
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
        showMainMenu={() => setShowQuizPage(false)}
      />
      {isSettingsVisible && <Settings onClose={() => setIsSettingsVisible(false)} />}
    </div>
  );
}

export default QuizPage;
