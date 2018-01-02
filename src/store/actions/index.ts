import { AnyAction } from "redux";
import { createAction } from "typesafe-actions";

import auth from "../reducers/auth";

// tslint:disable-next-line typedef
export const authActions = {
  requestAuth: createAction("REQUEST_AUTH", (email: string, password: string) => ({
    type: "REQUEST_AUTH",
    payload: {
      email,
      password
    }
  })),
  receiveAuth: createAction("RECEIVE_AUTH", (authToken: string, pairingToken: string) => ({
    type: "RECEIVE_AUTH",
    payload: {
      authToken,
      pairingToken
    }
  })),
  errorAuth: createAction("ERROR_AUTH", error => ({
    type: "ERROR_AUTH",
    payload: error
  }))
};