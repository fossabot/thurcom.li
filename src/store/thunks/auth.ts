import { ThunkAction } from "redux-thunk";
import { Dispatch } from "redux";

import api from "../../util/api";
import { authActions } from "../actions";

// todo: typedef
export const login = (email, password) => async dispatch => {
    try {
        const { authToken, pairingToken } = await api("ib/public/accounts/login", {
            headers: {
                Authorization: "Basic " + btoa(email + ":" + password)
            },
            method: "post"
        });
        dispatch(authActions.receiveAuth(authToken, pairingToken));
    } catch (error) {
        dispatch(authActions.errorAuth(error));
    }
};