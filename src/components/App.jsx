import React from 'react';
import Header from './Header';
import ContentContainer from './ContentContainer';
import EndMessage from './EndMessage';
import MenuModal from './MenuModal';
import styles from '../styles/App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <ContentContainer />
      <EndMessage />
      <MenuModal />
    </div>
  );
}

export default App;
