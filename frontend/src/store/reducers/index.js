import { combineReducers } from "redux";
import DriverReducer from "./driverReducer";
import CabReducer from "./cabReducer";

const reducers = combineReducers({
  drivers: DriverReducer,
  cabs: CabReducer,
});

export default reducers;