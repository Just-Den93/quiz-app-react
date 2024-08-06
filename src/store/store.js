import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './reducers';

// Комбинирование всех редукторов (если у вас их больше)
const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

export default store;
