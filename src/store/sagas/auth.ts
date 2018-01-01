import { takeLatest, call, put, CallEffect, PutEffect, ForkEffect } from "redux-saga/effects";

import { AuthActions } from "../actions/";

interface IApiRequestInit extends RequestInit {
    headers: any;
}

interface IAuthResponse {
    pairingToken: string;
    authToken: string;
}

const baseUrl: string = "https://cors-anywhere.herokuapp.com/https://appbroker.api.iptv.ch/";

type TApi = (url: string, config: IApiRequestInit) => Promise<any>;
const api: TApi = (url, { headers = {}, method = "get", ...rest }) => fetch(baseUrl + url, {
    headers: new Headers({ tenantId: 5, ...headers }),
    method,
    ...rest
}).then(res => res.json());


// todo: better type annotation
function* fetchLogin({ email, password }: any): IterableIterator<PutEffect<any> | CallEffect> {
    try {
        const res: IAuthResponse = yield call(api, "ib/public/accounts/login", {
            headers: {
                Authorization: "Basic " + btoa(email + ":" + password)
            },
            method: "post"
        });
        yield put({
            type: AuthActions.RECEIVE_AUTH,
            authToken: res.authToken,
            pairingToken: res.pairingToken
        });
        console.log(res);
    } catch (error) {
        console.log(error);
        yield put({
            type: AuthActions.ERROR_AUTH,
            error
        });
    }
}

export default function* watchFetchLogin(): IterableIterator<ForkEffect> {
    yield takeLatest(AuthActions.REQUEST_AUTH, fetchLogin);
}