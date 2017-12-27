import { Reducer } from "./index";
import { AuthActions } from "../actions";

type State = Readonly<{
  email: string;
  isLoading: boolean;
  error: string;
}>;

const initialState: State = {
  email: "",
  isLoading: false,
  error: ""
};

const auth: Reducer<State, AuthActions> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActions.RECEIVE_AUTH:
      return { email: action.email, isLoading: false, error: "" };
    case AuthActions.REQUEST_AUTH:
      return { ...state, isLoading: true };
  }
};

export default auth;
