import { Reducer } from "./index";
import { AuthActions } from "../actions";

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

const auth: Reducer<TAuthState, AuthActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AuthActions.RECEIVE_AUTH:
      return { authToken: action.authToken, pairingToken: action.pairingToken, isLoading: false, error: "" };
    case AuthActions.REQUEST_AUTH:
      return { ...state, isLoading: true };
    case AuthActions.ERROR_AUTH:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default auth;
