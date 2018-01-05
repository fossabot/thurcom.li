import { AnyAction } from 'redux';
import { createAction, getType } from 'typesafe-actions';

import auth from '../reducers/auth';
import Api from '../../util/api';
import store from '../index';

console.log(store);
const api = new Api(store);

// tslint:disable-next-line typedef
export const requestAuth = createAction(
	'REQUEST_AUTH',
	(email: string, password: string) => async dispatch => {
		console.log('test');
		dispatch({ type: getType(requestAuth) });
		try {
			const { authToken, pairingToken } = await api.login(email, password);
			dispatch(receiveAuth(authToken, pairingToken));
		} catch (error) {
			console.log(error);
			console.log('error');
			dispatch(errorAuth(error));
		}
	}
);

// tslint:disable-next-line typedef
export const receiveAuth = createAction(
	'RECEIVE_AUTH',
	(authToken: string, pairingToken: string) => ({
		type: 'RECEIVE_AUTH',
		payload: {
			authToken,
			pairingToken
		}
	})
);

// tslint:disable-next-line typedef
export const errorAuth = createAction('ERROR_AUTH', error => ({
	type: 'ERROR_AUTH',
	payload: error
}));
