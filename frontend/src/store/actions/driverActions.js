import { ActionTypes } from "../constants/action-types";
import * as api from '../../api/api'

export const fetchAllDrivers = () => {
    return async (dispatch) => {
        try {
            const response = await api.fetchDrivers();
            dispatch({type: ActionTypes.FETCH_DRIVERS , payload: response.data})
        }
        catch(e) {
            console.log("error");
        }
    }
}

export const createDriver = (data) => {
    return async (dispatch) => {
        try {
            const response = await api.createDriver(data);
            dispatch({type: ActionTypes.CREATE_DRIVER , payload: response.data})
        }
        catch(e) {
            console.log("error");
        }
    }
}

export const updateDriver = (id,data) => {
    return async (dispatch) => {
        try {
            const response = await api.updateDriver(id,data);
            dispatch({type: ActionTypes.UPDATE_DRIVER , payload: response.data})
        }
        catch(e) {
            console.log("error");
        }
    }
}

export const deleteDriver = (id) => {
    return async (dispatch) => {
        try {
            const response = await api.deleteDriver(id);
            dispatch({type: ActionTypes.DELETE_DRIVER , payload: id})
        }
        catch(e) {
            console.log("error");
        }
    }
}