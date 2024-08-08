import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Named import for thunk
import quizReducer from './reducers';

// Configure the Redux store
const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
