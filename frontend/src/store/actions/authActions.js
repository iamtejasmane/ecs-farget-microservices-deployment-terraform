import { ActionTypes } from "../constants/action-types";
import * as api from '../../api/api'
import axios from 'axios';

export const login = (data) => {
    return async (dispatch) => {
        try{
            const response = await api.loginOwner(data)
            const { token } = response.data
            localStorage.setItem('token', token);
            axios.defaults.headers.common['token'] = `${token}`;
            dispatch({ type: ActionTypes.OWNER_LOGIN, payload: token });
        }
        catch(e){
            console.log("error" , e);
        }
    }
}

export const checkAuth = () => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['token'] = `${token}`;
          dispatch({ type: ActionTypes.OWNER_LOGIN, payload: token });
        } else {
          localStorage.removeItem('token');
          dispatch({ type: ActionTypes.OWNER_LOGOUT });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

export const logout = () => {
  return (dispatch) => {
    try{
      localStorage.removeItem("token");
      dispatch({ type: ActionTypes.OWNER_LOGOUT });
    }
    catch(e){

    }
  }
}