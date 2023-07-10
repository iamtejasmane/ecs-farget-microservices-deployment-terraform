import { ActionTypes } from "../constants/action-types";
import * as api from '../../api/api'

export const fetchAllCabs = () => {
    return async (dispatch) => {
        try {
            const response = await api.fetchCabs();
            dispatch({type: ActionTypes.FETCH_CABS , payload: response.data})
        }
        catch(e) {
            console.log("error");
        }
    }
}

export const createCab = (data) => {
    return async (dispatch) => {
        try {
            const response = api.createCab(data);
            dispatch({type: ActionTypes.FETCH_CABS , payload: response.data})
        }
        catch(e) {
            console.log("error");
        }
    }
}

export const updateCab = (id,data) => {
    return async (dispatch) => {
        try {
            const response = api.updateCab(id,data);
            dispatch({type: ActionTypes.FETCH_CABS , payload: response.data})
        }
        catch(e) {
            console.log("error");
        }
    }
}

export const deleteCab = (id) => {
    return async (dispatch) => {
        try {
            const response = api.deleteCab(id);
            dispatch({type: ActionTypes.FETCH_CABS , payload: response})
        }
        catch(e) {
            console.log("error");
        }
    }
}