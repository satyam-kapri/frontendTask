export const setCurrentUser = (user) => ({
    type: 'SET_CURRENT_USER',
    payload: user,
  });
  
  export const clearCurrentUser = () => ({
    type: 'CLEAR_CURRENT_USER',
  });
  