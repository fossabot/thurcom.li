import { combineReducers } from "redux";

import { IEnumAction } from "../actions";
import auth, { TAuthState } from "./auth";
import guide, { TGuideState } from "./guide";

export type Reducer<S, T> = (state: S, action: IEnumAction<T>) => S;
export interface IRootState {
  auth: TAuthState;
  guide: TGuideState;
}

export default combineReducers<IRootState>({
  auth,
  guide
});
