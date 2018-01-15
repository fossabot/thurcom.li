import { getType } from "typesafe-actions";
import { Reducer } from "redux";

import { errorAuth, receiveAuth, requestAuth } from "../actions/auth";

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

const auth: Reducer<TAuthState> = (state = initialState, action) => {
  switch (action.type) {
    case getType(receiveAuth):
      return {
        authToken: action.payload.authToken,
        pairingToken: action.payload.pairingToken,
        isLoading: false,
        error: ""
      };
    case getType(requestAuth):
      return { ...state, isLoading: true };
    case getType(errorAuth):
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default auth;
