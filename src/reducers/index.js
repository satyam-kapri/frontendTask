// src/reducers/index.js
import { combineReducers } from "redux";
// Import other reducers here
import userReducer from "./userReducer";
import currentUserReducer from "./currentUserReducer";
const rootReducer = combineReducers({
  userState: userReducer, // Use your actual reducers here
  currentUser:currentUserReducer
});

export default rootReducer;
