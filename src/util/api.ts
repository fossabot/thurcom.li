interface IApiRequestInit extends RequestInit {
    headers: any;
}

const baseUrl: string = "https://cors-anywhere.herokuapp.com/https://appbroker.api.iptv.ch/";

type TApi = (url: string, config: IApiRequestInit) => Promise<any>;
const api: TApi = (url, { headers = {}, method = "get", ...rest }) => fetch(baseUrl + url, {
    headers: new Headers({ tenantId: 5, ...headers }),
    method,
    ...rest
}).then(res => res.json());

export default api;