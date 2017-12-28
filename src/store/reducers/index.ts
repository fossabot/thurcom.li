import { combineReducers } from "redux";

import { IEnumAction } from "../actions";
import auth from "./auth";
import guide from "./guide";

export type Reducer<S, T> = (state: S, action: IEnumAction<T>) => S;

export default combineReducers({
  auth,
  guide
});
