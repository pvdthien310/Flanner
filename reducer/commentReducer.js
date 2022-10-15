const initState = {
  nextCursor: 0,
  loading: true,
  currentEditedId: "",
};

const CommentReducer = (state = initState, action) => {
  if (action.type == "SET_CURSOR_COMMENT") {
    const newState = {
      ...state,
      nextCursor: action.payload,
    };
    return newState;
  }

  if (action.type == "SET_LOADING_COMMENT") {
    const newState = {
      ...state,
      loading: action.payload,
    };
    return newState;
  }

  if (action.type == "SET_EDITED_COMMENT") {
    const newState = {
      ...state,
      currentEditedId: action.payload,
    };
    return newState;
  }

  return state;
};
export default CommentReducer;
