import { getType } from "typesafe-actions";
import { Reducer } from "redux";

import { authActions } from "../actions";

export type TAuthState = Readonly<{
  authToken: string;
  pairingToken: string;
  isLoading: boolean;
  error: string;
}>;

const initialState: TAuthState = {
  authToken: "",
  pairingToken: "",
  isLoading: false,
  error: ""
};

const auth: Reducer<TAuthState> = (
  state = initialState,
  action
) => {
  const { payload, type } = action;
  switch (type) {
    case getType(authActions.receiveAuth):
      return { authToken: payload.authToken, pairingToken: payload.pairingToken, isLoading: false, error: "" };
    case getType(authActions.requestAuth):
      return { ...state, isLoading: true };
    case getType(authActions.errorAuth):
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};

export default auth;
