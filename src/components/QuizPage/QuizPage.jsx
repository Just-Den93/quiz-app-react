import React, { useMemo, useState } from 'react';
import ContentContainer from '../ContentContainer/ContentContainer';
import EndMessage from '../EndMessage/EndMessage';
import MenuModal from '../MenuModal/MenuModal';
import Modal from '../Modal/Modal';
import Settings from '../Settings/Settings';
import ConfettiAnimation from '../Animation/ConfettiAnimation';
import styles from './QuizPage.module.css';
import { useQuizContext } from '../../context/QuizContext';
import PCImage from '../../images/PC_horizontal_1line_black.svg';
import {
  getTotalBlocks,
  getUsedBlocksCount,
  handleBlockSelect,
  handleCloseModal,
  handleNewGame,
  handleMainMenu,
  handleSelectCategory
} from './quizPageUtils';
function QuizPage() {
  const { quizStates, setShowQuizPage, currentQuizId, selectedMode, data, markBlockAsUsed, setQuizStates } = useQuizContext();
  const currentQuizState = useMemo(() => quizStates[currentQuizId] || {}, [quizStates, currentQuizId]);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [confettiRunning, setConfettiRunning] = useState(false);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isBlockUsed, setIsBlockUsed] = useState(false);

  const totalBlocks = useMemo(() => getTotalBlocks(data), [data]);
  const usedBlocksCount = useMemo(() => getUsedBlocksCount(currentQuizState), [currentQuizState]);

  return (
    <div className={styles.quiz_page}>
      <ConfettiAnimation isRunning={confettiRunning} />
      {data ? (
        <>
          <img src={PCImage} alt="PC horizontal line" className={styles.image} />
          <ContentContainer
            data={data}
            onBlockSelect={(block, category) => handleBlockSelect(
              block, category, currentQuizState, setSelectedBlock, setSelectedCategory, setIsBlockUsed
            )}
            usedBlocks={currentQuizState.usedBlocks || {}}
          />

          {selectedBlock && (
            <Modal
              block={selectedBlock}
              categoryName={selectedCategory?.name || 'Без категории'}
              onClose={() => handleCloseModal(setSelectedBlock, setSelectedCategory, setIsBlockUsed)}
              selectedMode={selectedMode}
              onSelectCategory={(categoryId, blockId) => handleSelectCategory(
                categoryId, blockId, currentQuizId, markBlockAsUsed, totalBlocks, usedBlocksCount, setConfettiRunning, setShowEndMessage, () => handleCloseModal(setSelectedBlock, setSelectedCategory, setIsBlockUsed)
              )}
              isBlockUsed={isBlockUsed}
              onTryAgain={() => setIsBlockUsed(false)}
              onContinue={() => handleCloseModal(setSelectedBlock, setSelectedCategory, setIsBlockUsed)}
            />
          )}
        </>
      ) : (
        <div>No data available.</div>
      )}

      {showEndMessage && (
        <EndMessage
          onNewGame={() => handleNewGame(currentQuizId, setQuizStates, setConfettiRunning, setShowEndMessage)}
          onMainMenu={() => handleMainMenu(currentQuizId, setQuizStates, setShowQuizPage, setConfettiRunning, true)}
        />
      )}

      <MenuModal
        showSettings={() => setIsSettingsVisible(true)}
        showMainMenu={() => handleMainMenu(currentQuizId, setQuizStates, setShowQuizPage, setConfettiRunning, false)}
        onNewGame={() => handleNewGame(currentQuizId, setQuizStates, setConfettiRunning, setShowEndMessage)}
        isVisible={isMenuVisible}
        closeMenuModal={() => setIsMenuVisible(false)}
      />

      {isSettingsVisible && <Settings onClose={() => setIsSettingsVisible(false)} />}
    </div>
  );
}

export default QuizPage;
