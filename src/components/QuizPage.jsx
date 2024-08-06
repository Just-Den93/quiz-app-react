import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import ContentContainer from './ContentContainer';
import EndMessage from './EndMessage';
import MenuModal from './MenuModal';
import Settings from './Settings';
import styles from '../styles/QuizPage.module.css';
import { loadJsonDataByMode } from '../utils/loadJsonData';
import { setQuizState, markBlockAsUsed } from '../store/actions';

const QuizPage = ({ quizState, setQuizState, markBlockAsUsed, showMainMenu, handleNewGame, mode }) => {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (mode) {
      const selectedData = loadJsonDataByMode(parseInt(mode, 10));
      if (selectedData) {
        setData(selectedData.categories);
        setQuizState(mode, { categories: selectedData.categories });
      }
    }
  }, [mode, setQuizState]);

  const showSettings = () => {
    setIsSettingsVisible(true);
  };

  const hideSettings = () => {
    setIsSettingsVisible(false);
  };

  return (
    <div className={styles.quiz_page}>
      <Header />
      <ContentContainer
        usedBlocks={quizState[mode]?.usedBlocks || {}}
        markBlockAsUsed={(categoryName, blockId) => markBlockAsUsed(mode, categoryName, blockId)}
        data={data}
        mode={mode}
      />
      <EndMessage />
      <MenuModal showSettings={showSettings} showMainMenu={showMainMenu} />
      {isSettingsVisible && <Settings onClose={hideSettings} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  quizState: state.quiz,
});

const mapDispatchToProps = {
  setQuizState,
  markBlockAsUsed,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizPage);
