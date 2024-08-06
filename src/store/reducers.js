// Начальное состояние
const initialState = {};

// Редуктор для управления состоянием викторины
const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUIZ_STATE':
      return {
        ...state,
        [action.payload.mode]: {
          ...state[action.payload.mode],
          ...action.payload.state,
        },
      };
    case 'MARK_BLOCK_AS_USED':
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
    default:
      return state;
  }
};

export default quizReducer;
