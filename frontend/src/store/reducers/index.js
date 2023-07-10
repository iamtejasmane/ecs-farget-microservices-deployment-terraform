import { combineReducers } from "redux";
import DriverReducer from "./driverReducer";
import CabReducer from "./cabReducer";
import authReducer from "./authReducer";

const reducers = combineReducers({
  drivers: DriverReducer,
  cabs: CabReducer,
  auth: authReducer,
});

export default reducers;