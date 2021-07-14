import { combineReducers } from "redux";
import rateReducer from "./RateReducer";

const RootReducer = combineReducers({
  rate: rateReducer.reducer,
});

export default RootReducer;
