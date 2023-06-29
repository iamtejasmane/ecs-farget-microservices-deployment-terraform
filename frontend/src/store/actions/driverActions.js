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
            const response = api.createDriver(data);
            dispatch({type: ActionTypes.FETCH_DRIVERS , payload: response.data})
        }
        catch(e) {
            console.log("error");
        }
    }
}

export const updateDriver = (id,data) => {
    return async (dispatch) => {
        try {
            const response = api.updateDriver(id,data);
            dispatch({type: ActionTypes.FETCH_DRIVERS , payload: response.data})
        }
        catch(e) {
            console.log("error");
        }
    }
}

export const deleteDriver = (id) => {
    return async (dispatch) => {
        try {
            const response = api.deleteDriver(id);
            dispatch({type: ActionTypes.FETCH_DRIVERS , payload: response})
        }
        catch(e) {
            console.log("error");
        }
    }
}