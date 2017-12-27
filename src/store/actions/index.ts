import { AnyAction } from "redux";

export interface IEnumAction<T> extends AnyAction {
  type: T;
}

export const enum AuthActions {
  REQUEST_AUTH,
  RECEIVE_AUTH
}
