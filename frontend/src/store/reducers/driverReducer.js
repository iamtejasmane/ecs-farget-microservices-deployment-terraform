import { ActionTypes } from "../constants/action-types";

const drivers = []

const DriverReducer = (state = drivers, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_DRIVERS:
            return action.payload
        
        case ActionTypes.CREATE_DRIVER:
            return [...drivers,action.payload]
        
        case ActionTypes.UPDATE_DRIVER:
            return drivers.map((driver) =>
                driver.driverId === action.payload.driverId ? action.payload : driver
            );

        case ActionTypes.DELETE_DRIVER:
            return drivers.filter((driver) => driver.driverId !== action.payload)
    
        default:
            return state;
    }
}

export default DriverReducer