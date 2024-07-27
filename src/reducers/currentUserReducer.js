const initialState = null; 

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return action.payload; 

    case "CLEAR_CURRENT_USER":
      return null;
    default:
      return state; 
  }
};

export default currentUserReducer;
