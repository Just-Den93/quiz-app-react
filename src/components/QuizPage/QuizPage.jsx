import React, { useMemo, useState } from 'react';
import ContentContainer from '../ContentContainer/ContentContainer';
import EndMessage from '../EndMessage/EndMessage';
import MenuModal from '../MenuModal/MenuModal';
import Modal from '../Modal/Modal';
import Settings from '../Settings/Settings';
import ConfettiAnimation from '../ConfettiAnimation/ConfettiAnimation';
import styles from './QuizPage.module.css';
import { useQuizContext } from '../../context/QuizContext';
import PCImage from '../../images/PC_horizontal_1line_black.svg';


function QuizPage() {
  const { quizStates, setShowQuizPage, currentQuizId, selectedMode, data, markBlockAsUsed, setQuizStates } = useQuizContext();
  const currentQuizState = useMemo(() => quizStates[currentQuizId] || {}, [quizStates, currentQuizId]);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [confettiRunning, setConfettiRunning] = useState(false);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isBlockUsed, setIsBlockUsed] = useState(false); // Для отслеживания использования блока


  const totalBlocks = useMemo(() => {
    return data?.reduce((acc, category) => acc + category.blocks.length, 0) || 0;
  }, [data]);


  const usedBlocksCount = useMemo(() => {
    return Object.values(currentQuizState.usedBlocks || {}).reduce(
      (acc, categoryBlocks) => acc + categoryBlocks.length,
      0
    );
  }, [currentQuizState]);


  // Проверка использования блока до открытия Modal
  const handleBlockSelect = (block, category) => {
    setSelectedBlock(block);
    setSelectedCategory(category);


    if (currentQuizState.usedBlocks?.[category.id]?.includes(block.id)) {
      setIsBlockUsed(true); // Блок уже использован
    } else {
      setIsBlockUsed(false); // Блок не использован
    }
  };


  const handleCloseModal = () => {
    setSelectedBlock(null);
    setSelectedCategory(null);
    setIsBlockUsed(false); // Сброс состояния при закрытии Modal
  };


  const handleSelectCategory = (categoryId, blockId) => {
    markBlockAsUsed(currentQuizId, categoryId, blockId);


    if (usedBlocksCount === totalBlocks - 1) {
      setConfettiRunning(true);
      setShowEndMessage(true);
    }


    handleCloseModal();
  };


  const handleTryAgain = () => {
    // Закрываем WarningMessage, оставляем Modal
    setIsBlockUsed(false);
  };


  const handleContinue = () => {
    // Закрываем WarningMessage и Modal
    handleCloseModal();
  };


  const handleNewGame = () => {
    localStorage.removeItem(`data-${currentQuizId}`);
    localStorage.removeItem(`usedBlocks-${currentQuizId}`);
    localStorage.removeItem('quizStates');


    setQuizStates((prevStates) => ({
      ...prevStates,
      [currentQuizId]: {
        usedBlocks: {},
        data: null,
      },
    }));


    setConfettiRunning(false);
    setShowEndMessage(false);
  };


  const handleMainMenu = (clearState = false) => {
    if (clearState) {
      localStorage.removeItem(`data-${currentQuizId}`);
      setQuizStates((prevStates) => ({
        ...prevStates,
        [currentQuizId]: {
          usedBlocks: {},
          data: null,
        },
      }));
    }
    setShowQuizPage(false);
    setConfettiRunning(false);
  };


  return (
    <div className={styles.quiz_page}>
      <ConfettiAnimation isRunning={confettiRunning} />
      {data ? (
        <>
          <img src={PCImage} alt="PC horizontal line" className={styles.image} />
          <ContentContainer
            data={data}
            onBlockSelect={handleBlockSelect}
            usedBlocks={currentQuizState.usedBlocks || {}}
          />


          {/* Modal открывается для выбранного блока */}
          {selectedBlock && (
            <Modal
              block={selectedBlock}
              categoryName={selectedCategory?.name || 'Без категории'}
              onClose={handleCloseModal}
              selectedMode={selectedMode}
              onSelectCategory={handleSelectCategory}
              isBlockUsed={isBlockUsed} // Передаем флаг использования блока в Modal
              onTryAgain={handleTryAgain}
              onContinue={handleContinue}
            />
          )}
        </>
      ) : (
        <div>No data available.</div>
      )}


      {showEndMessage && (
        <EndMessage
          onNewGame={handleNewGame}
          onMainMenu={() => handleMainMenu(true)}
        />
      )}


      <MenuModal
        showSettings={() => setIsSettingsVisible(true)}
        showMainMenu={() => handleMainMenu(false)}
        onNewGame={handleNewGame}
        isVisible={isMenuVisible}
        closeMenuModal={() => setIsMenuVisible(false)}
      />


      {isSettingsVisible && <Settings onClose={() => setIsSettingsVisible(false)} />}
    </div>
  );
}


export default QuizPage;
