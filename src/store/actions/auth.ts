import { AnyAction, Dispatch } from "redux";
import { createAction, getType } from "typesafe-actions";

import Api, { ILoginResponse, ICountryResponse } from "../../util/api";
import { IRootState } from "../reducers/index";

// tslint:disable-next-line typedef
export const requestAuth = createAction(
	"REQUEST_AUTH",
	(email: string, password: string) => async (dispatch: Dispatch<IRootState>, getState: () => IRootState) => {
		dispatch({ type: getType(requestAuth) });
		const api: Api = new Api(getState);
		try {
			const loginRequest: Promise<ILoginResponse> = api.login(email, password);
			const countryCheckRequest: Promise<ICountryResponse> = api.countryCheck();
			const [loginResponse, countryCheckResponse] = await Promise.all([loginRequest, countryCheckRequest]);
			const { authToken, pairingToken } = loginResponse;
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
