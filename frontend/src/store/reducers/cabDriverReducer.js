import { ActionTypes } from "../constants/action-types";

const initialState = {
    assignments: [],
    drivers: [],
    cabs: [],
    error: null,
  };

const CabDriverReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CAB_DRIVERS:
            return {
                ...state,
                assignments: action.payload,
                error: null,
              };
        
        case ActionTypes.ASSIGN_CAB_DRIVER:
            return {
                ...state,
                assignments: [...state.assignments, action.payload],
                error: null,
              };
        
        case ActionTypes.FETCH_UNASSIGNED_DRIVERS:
            return {
                ...state,
                drivers: action.payload.drivers,
                error: null
            }
        
        case ActionTypes.FETCH_UNASSIGNED_CABS:
            return {
                ...state,
                cabs: action.payload.cabs,
                error: null
            }
        case ActionTypes.FETCH_CAB_DRIVERS_ERROR:
        case ActionTypes.ASSIGN_CAB_DRIVER_ERROR:
        case ActionTypes.UPDATE_CAB_DRIVER_ASSIGNMENT_ERROR:
            return {
              ...state,
              error: action.payload,
            };
        
        case ActionTypes.UPDATE_ASSIGNMENT:
            const updatedAssignments = state.assignments.map((assignment) =>
                assignment.cabAssignmentId === action.payload.cabAssignmentId ? action.payload : assignment
            );
            return {
                ...state,
                assignments: updatedAssignments,
                error: null,
            };

        case ActionTypes.DELETE_ASSIGNMENT:
            const updatedCabDrivers =  state.assignments.filter((assignment) => assignment.cabAssignmentId !== action.payload)
            return {
                ...state,
                assignments: updatedCabDrivers,
                error: null,
              };
    
        default:
            return state;
    }
}

export default CabDriverReducer