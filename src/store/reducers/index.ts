import { combineReducers } from "redux";

import { IEnumAction } from "../actions";

export type Reducer<S, T> = (state: S, action: IEnumAction<T>) => S;
