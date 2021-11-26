import { combineReducers } from "redux";

import flightReducer from "../reducer";

const rootReducer = combineReducers({
  flight: flightReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;