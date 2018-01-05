import { Store } from 'redux';
import { IRootState } from '../store/reducers/index';

interface IApiRequestInit extends RequestInit {
	headers: any;
}

interface ILoginResponse {
	authToken: string;
	pairingToken: string;
}

class Api {
	static readonly baseUrl: string = 'https://cors-anywhere.herokuapp.com/https://appbroker.api.iptv.ch/';
	constructor(private store: Store<IRootState>) {}
	request<T>(
		url: string,
		{ headers = {}, ...rest }: IApiRequestInit
	): Promise<T> {
		const { authToken, pairingToken } = this.store.getState().auth;
		return fetch(Api.baseUrl + url, {
			headers: new Headers({
				tenantId: 5,
				authToken,
				pairingToken,
				...headers
			})
		}).then(res => res.json());
	}
	login(email: string, password: string): Promise<ILoginResponse> {
		return this.request('ib/public/accounts/login', {
			headers: {
				Authorization: 'Basic ' + btoa(email + ':' + password)
			},
			method: 'post'
		});
	}
}

export default Api;
