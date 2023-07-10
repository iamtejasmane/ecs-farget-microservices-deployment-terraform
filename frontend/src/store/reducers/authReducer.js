import { ActionTypes } from "../constants/action-types";

const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.OWNER_LOGIN:
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload,
        };
      case ActionTypes.OWNER_LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          token: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;