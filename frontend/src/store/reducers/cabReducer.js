import { ActionTypes } from "../constants/action-types";

const cabs = []

const CabReducer = (state = cabs, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CABS:
            return action.payload
        
        case ActionTypes.CREATE_CAB:
            return [...cabs,action.payload]
        
        case ActionTypes.UPDATE_CAB:
            console.log("action payload cab", action.payload)
            return cabs.map((cab) =>
                cab.cabId === action.payload.cabId ? action.payload : cab
            );

        case ActionTypes.DELETE_CAB:
            return cabs.filter((cab) => cab.cabId !== action.payload)
    
        default:
            return state;
    }
}

export default CabReducer