import { Reducer } from "./index";
import { AuthActions } from "../actions";

export type TAuthState = Readonly<{
  email: string;
  isLoading: boolean;
  error: string;
}>;

const initialState: TAuthState = {
  email: "",
  isLoading: false,
  error: ""
};

const auth: Reducer<TAuthState, AuthActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AuthActions.RECEIVE_AUTH:
      return { email: action.email, isLoading: false, error: "" };
    case AuthActions.REQUEST_AUTH:
      return { ...state, isLoading: true };
    case AuthActions.ERROR_AUTH:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default auth;
