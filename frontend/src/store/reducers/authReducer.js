import { ActionTypes } from "../constants/action-types";

const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
    errorMessage: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.OWNER_LOGIN:
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload,
          errorMessage: ''
        };
      case ActionTypes.OWNER_LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          token: null,
          errorMessage: ''
        };
      case ActionTypes.LOGIN_ERROR:
        return {
          ...state,
          errorMessage: action.payload
        };
      default:
        return state;
    }
  };
  
  export default authReducer;