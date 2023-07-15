import { ActionTypes } from "../constants/action-types";

const assignments = []

const CabDriverReducer = (state = assignments, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CAB_DRIVERS:
            console.log("Called fetch cab drivers")
            return action.payload
        
        case ActionTypes.ASSIGN_CAB_DRIVER:
            console.log("Action payload post assignment", [...assignments,action.payload])
            return [...assignments,action.payload]
        
        case ActionTypes.UPDATE_ASSIGNMENT:
            console.log("action payload", action.payload)
            return assignments.map((driver) =>
                driver.driverId === action.payload.driverId ? action.payload : driver
            );

        case ActionTypes.DELETE_ASSIGNMENT:
            return assignments.filter((driver) => driver.driverId !== action.payload)
    
        default:
            return state;
    }
}

export default CabDriverReducer