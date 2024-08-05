import React from 'react';
import Header from './Header';
import ContentContainer from './ContentContainer';
import EndMessage from './EndMessage';
import MenuModal from './MenuModal';
import Settings from './Settings';
import styles from '../styles/QuizPage.module.css';
import { useQuizPageLogic } from '../utils/quizPageUtils';

function QuizPage({ showMainMenu, handleNewGame }) {
  const {
    usedBlocks,
    isSettingsVisible,
    markBlockAsUsed,
    showSettings,
    hideSettings,
  } = useQuizPageLogic();

  return (
    <div className={styles.quiz_page}>
      <Header />
      <ContentContainer usedBlocks={usedBlocks} markBlockAsUsed={markBlockAsUsed} />
      <EndMessage />
      <MenuModal showSettings={showSettings} showMainMenu={showMainMenu} />
      {isSettingsVisible && <Settings onClose={hideSettings} />}
    </div>
  );
}

export default QuizPage;
