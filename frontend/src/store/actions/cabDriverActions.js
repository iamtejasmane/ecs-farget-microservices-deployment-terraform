import { ActionTypes } from "../constants/action-types";
import * as api from '../../api/api'

export const fetchAllCabDrivers = () => {
    return async (dispatch) => {
        try {
            const response = await api.fetchCabDrivers();
            dispatch({type: ActionTypes.FETCH_CAB_DRIVERS , payload: response.data})
        }
        catch(e) {
            dispatch({ type: ActionTypes.FETCH_CAB_DRIVERS_ERROR, payload: e.message });
        }
    }
}

export const fetchUnassignedDrivers = () => {
    return async (dispatch) => {
        try {
            const response = await api.fetchUnassignedDrivers();
            console.log("unassigned driver", response.data)
            dispatch({type: ActionTypes.FETCH_UNASSIGNED_DRIVERS , payload: response.data})
        }
        catch(e) {
            console.log("error: ", e)
        }
    }
}

export const fetchUnassignedCabs = () => {
    return async (dispatch) => {
        try {
            const response = await api.fetchUnassignedCabs();
            dispatch({type: ActionTypes.FETCH_UNASSIGNED_CABS , payload: response.data})
        }
        catch(e) {
            console.log("error: ", e)
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
            console.log("error", e);
            dispatch({ type: ActionTypes.ASSIGN_CAB_DRIVER_ERROR, payload: e.response.data });
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
            console.log("error", e);
            dispatch({ type: ActionTypes.UPDATE_CAB_DRIVER_ASSIGNMENT_ERROR, payload: e.response.data });
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