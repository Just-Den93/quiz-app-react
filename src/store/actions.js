import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadJsonDataByMode } from '../utils/loadJsonData';

// Thunk for fetching quiz data
export const fetchQuizData = createAsyncThunk(
  'quiz/fetchQuizData',
  async (mode) => {
    const data = await loadJsonDataByMode(mode);
    return { mode, data };
  }
);

export const setQuizState = (mode, state) => ({
  type: 'SET_QUIZ_STATE',
  payload: { mode, state },
});

export const markBlockAsUsed = (mode, categoryName, blockId) => ({
  type: 'MARK_BLOCK_AS_USED',
  payload: { mode, categoryName, blockId },
});
