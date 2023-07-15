import { combineReducers } from "redux";
import DriverReducer from "./driverReducer";
import CabReducer from "./cabReducer";
import authReducer from "./authReducer";
import CabDriverReducer from "./cabDriverReducer";

const reducers = combineReducers({
  drivers: DriverReducer,
  cabs: CabReducer,
  assignments : CabDriverReducer,
  auth: authReducer,
});

export default reducers;