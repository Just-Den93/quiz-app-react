// src/components/App.jsx
import React from 'react';
import Sidebar from './Sidebar';
import QuizCard from './QuizCard';
import styles from '../styles/App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <QuizCard />
    </div>
  );
}

export default App;
