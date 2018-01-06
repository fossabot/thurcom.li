import { Store } from "redux";
import { IRootState } from "../store/reducers/index";

interface IApiRequestInit extends RequestInit {
    headers?: any;
}

export interface ILoginResponse {
    authToken: string;
    pairingToken: string;
}

export interface ICountryResponse {
    allowed: boolean;
    clientAdress: string;
    clientCountry: string;
    clientIsoCountry: string;
}

class Api {
    static readonly baseUrl: string = "https://cors-anywhere.herokuapp.com/https://appbroker.api.iptv.ch/";
    constructor(private getState: () => IRootState) { }
    request<T>(
        url: string,
        { headers = {}, ...rest }: IApiRequestInit = {}
    ): Promise<T> {
        const { authToken, pairingToken } = this.getState().auth;
        return fetch(Api.baseUrl + url, {
            headers: new Headers({
                tenantId: 5,
                authToken,
                pairingToken,
                ...headers
            }),
            ...rest
        }).then(res => res.json());
    }
    static readonly loginUrl: string = "ib/public/accounts/login";
    login(email: string, password: string): Promise<ILoginResponse> {
        return this.request(Api.loginUrl, {
            headers: {
                Authorization: "Basic " + btoa(email + ":" + password)
            },
            method: "post"
        });
    }
    static readonly countryCheckUrl: string = "ib/public/countryCheck";
    // todo: include correct error handling if allowed is false and test ist
    countryCheck(): Promise<ICountryResponse> {
        return this.request(Api.countryCheckUrl);
    }
}

export default Api;
