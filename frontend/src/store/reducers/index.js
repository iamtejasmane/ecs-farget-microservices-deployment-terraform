import { combineReducers } from "redux";
import DriverReducer from "./driverReducer";

const reducers = combineReducers({
  drivers: DriverReducer,
});

export default reducers;