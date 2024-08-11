const initialState = {
  showQuizPage: false,
  selectedMode: null,
  categories: {},
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SHOW_QUIZ_PAGE':
      return {
        ...state,
        showQuizPage: action.payload,
      };
    case 'SET_SELECTED_MODE':
      return {
        ...state,
        selectedMode: action.payload,
      };
    case 'SET_QUIZ_STATE':
      return {
        ...state,
        [action.payload.mode]: {
          ...state[action.payload.mode],
          ...action.payload.state,
        },
      };
    case 'MARK_BLOCK_AS_USED':
      if (!state[action.payload.mode]) {
        return state;
      }
      return {
        ...state,
        [action.payload.mode]: {
          ...state[action.payload.mode],
          usedBlocks: {
            ...state[action.payload.mode].usedBlocks,
            [action.payload.categoryName]: [
              ...(state[action.payload.mode].usedBlocks[action.payload.categoryName] || []),
              action.payload.blockId,
            ],
          },
        },
      };
    case 'quiz/fetchQuizData/fulfilled':
      return {
        ...state,
        [action.payload.mode]: {
          ...state[action.payload.mode],
          categories: action.payload.data.categories,
        },
      };
    default:
      return state;
  }
};

export default quizReducer;
