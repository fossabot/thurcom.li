import { getType } from "typesafe-actions";
import configureMockStore, { MockStoreCreator, MockStore } from "redux-mock-store";
import thunk from "redux-thunk";
import * as fetchMock from "fetch-mock";

import { errorAuth, receiveAuth, requestAuth } from "../../../src/store/actions/auth";
import { IRootState } from "../../../src/store/reducers/";
import { FluxStandardAction } from "typesafe-actions";
import Api from "../../../src/util/api";

const mockStore: MockStoreCreator<Partial<IRootState>> = configureMockStore([thunk]);


describe("auth actions", () => {
    let store: MockStore<Partial<IRootState>> = null;
    beforeEach(() => {
        fetchMock.reset();
        fetchMock.restore();
        fetchMock.get(Api.baseUrl + Api.countryCheckUrl, {
            body: {
                allowed: true
            }
        });
        store = mockStore({
            auth: {
                authToken: "",
                pairingToken: "",
                error: "",
                isLoading: false
            }
        });
    });

    it("success", () => {
        fetchMock.postOnce(Api.baseUrl + Api.loginUrl, {
            body: {
                authToken: "test123",
                pairingToken: "hallowelt"
            }
        });

        const expected: ReadonlyArray<FluxStandardAction<any>> = [
            { type: getType(requestAuth) },
            {
                type: getType(receiveAuth), payload: {
                    authToken: "test123",
                    pairingToken: "hallowelt"
                }
            }
        ];

        return store.dispatch(requestAuth("test@test.com", "hunter2")).then(() => {
            expect(store.getActions()).toEqual(expected);
        });
    });

    it("error", () => {
        fetchMock.postOnce(Api.baseUrl + Api.loginUrl, {
            status: 401,
            body: {
                errorCode: "AUTHENTICATION_FAILED",
                errorMessage: "Account authentication failed, wrong username/password combination!"
            }
        });

        const expected: ReadonlyArray<FluxStandardAction<any>> = [
            { type: getType(requestAuth) },
            {
                type: getType(errorAuth), payload: {
                    errorCode: "AUTHENTICATION_FAILED",
                    errorMessage: "Account authentication failed, wrong username/password combination!"
                }
            }
        ];

        return store.dispatch(requestAuth("test@test.com", "wrongpassword")).then(() => {
            expect(store.getActions()).toEqual(expected);
        });

    });
});