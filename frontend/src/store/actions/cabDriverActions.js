import { ActionTypes } from "../constants/action-types";
import * as api from '../../api/api'

export const fetchAllCabDrivers = () => {
    return async (dispatch) => {
        try {
            const response = await api.fetchCabDrivers();
            console.log("in cab driver actions")
            dispatch({type: ActionTypes.FETCH_CAB_DRIVERS , payload: response.data})
        }
        catch(e) {
            console.log("error");
        }
    }
}

export const assignCabDriver = (data) => {
    return async (dispatch) => {
        try {
            const response = await api.assignCabDriver(data);
            console.log("in cab driver actions", response.data)
            dispatch({type: ActionTypes.ASSIGN_CAB_DRIVER , payload: response.data})
        }
        catch(e) {
            console.log("error");
        }
    }
}

export const updateCabDriverAssignment = (id,data) => {
    return async (dispatch) => {
        try {
            const response = await api.updateCabDriverAssignment(id,data);
            dispatch({type: ActionTypes.UPDATE_ASSIGNMENT , payload: response.data})
        }
        catch(e) {
            console.log("error");
        }
    }
}

export const deleteCabDriverAssignment = (id) => {
    return async (dispatch) => {
        try {
            const response = await api.deleteCabDriverAssignment(id);
            dispatch({type: ActionTypes.DELETE_ASSIGNMENT , payload: id})
        }
        catch(e) {
            console.log("error");
        }
    }
}