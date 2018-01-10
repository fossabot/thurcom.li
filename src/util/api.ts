import { Store } from "redux";
import { IRootState } from "../store/reducers/index";

interface IApiRequestInit extends RequestInit {
    headers?: any;
}

export type ILoginResponse = Readonly<{
    authToken: string;
    pairingToken: string;
}>;

export type ICountryResponse = Readonly<{
    allowed: boolean;
    clientAdress: string;
    clientCountry: string;
    clientIsoCountry: string;
}>;

export type IChannelResponse = ReadonlyArray<{
    channelId: string;
    name: string;
    hd: boolean;
    adultContent: boolean;
    replayAvailable: boolean;
    replayAssetLifetime: number;
    replayActivation: number;
    recordable: number;
    language: string;
    iptvAvailable: boolean;
    ottAvailable: boolean;
    webAvailable: boolean;
    type: string;
    fokusonChannelId: number;
    subscribed: boolean;
    ottDrmProtected: false;
    availableStreamProtocols: ReadonlyArray<string>;
    multicastAddress: null;
}>;

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
    // todo: include correct error handling if allowed is false and test it
    countryCheck(): Promise<ICountryResponse> {
        return this.request(Api.countryCheckUrl);
    }

    static readonly channelsUrl: string = "ib/auth/tv/channels";
    getChannels(): Promise<IChannelResponse> {
        return this.request(Api.channelsUrl);
    }
}

export default Api;
