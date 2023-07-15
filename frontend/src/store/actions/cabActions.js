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
            const response = await api.createCab(data);
            dispatch({type: ActionTypes.CREATE_CAB , payload: response.data})
        }
        catch(e) {
            console.log("error");
        }
    }
}

export const updateCab = (id,data) => {
    return async (dispatch) => {
        try {
            const response = await api.updateCab(id,data);
            dispatch({type: ActionTypes.UPDATE_CAB , payload: response.data})
        }
        catch(e) {
            console.log("error");
        }
    }
}

export const deleteCab = (id) => {
    return async (dispatch) => {
        try {
            const response = await api.deleteCab(id);
            dispatch({type: ActionTypes.DELETE_CAB , payload: id})
        }
        catch(e) {
            console.log("error");
        }
    }
}