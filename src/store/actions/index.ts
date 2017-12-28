import { AnyAction } from "redux";

export interface IEnumAction<T> extends AnyAction {
  type: T;
}

export const enum AuthActions {
  REQUEST_AUTH,
  RECEIVE_AUTH,
  ERROR_AUTH
}

export const enum GuideActions {
  REQUEST_GUIDE,
  RECEIVE_GUIDE,
  ERROR_GUIDE
}
