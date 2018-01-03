import { AnyAction } from "redux";
import { createAction } from "typesafe-actions";

import auth from "../reducers/auth";
import api from "../../util/api";

// tslint:disable-next-line typedef
export const requestAuth = createAction(
  "REQUEST_AUTH",
  (email: string, password: string) => async dispatch => {
    dispatch({ type: "REQUEST_AUTH" });
    try {
      const { authToken, pairingToken } = await api(
        "ib/public/accounts/login",
        {
          headers: {
            Authorization: "Basic " + btoa(email + ":" + password)
          },
          method: "post"
        }
      );
      dispatch(receiveAuth(authToken, pairingToken));
    } catch (error) {
      dispatch(errorAuth(error));
    }
  }
);

// tslint:disable-next-line typedef
export const receiveAuth = createAction(
  "RECEIVE_AUTH",
  (authToken: string, pairingToken: string) => ({
    type: "RECEIVE_AUTH",
    payload: {
      authToken,
      pairingToken
    }
  })
);

// tslint:disable-next-line typedef
export const errorAuth = createAction("ERROR_AUTH", error => ({
  type: "ERROR_AUTH",
  payload: error
}));
