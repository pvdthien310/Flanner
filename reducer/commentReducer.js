const initState = {
  cursor: 0,
};

const CommentReducer = (state = initState, action) => {
  if (action.type == "SET_CURSOR") {
    const newState = {
      ...state,
      cursor: action.payload,
    };
    return newState;
  }

  return state;
};
export default CommentReducer;
