import { getType } from "typesafe-actions";

import auth, { TAuthState } from "../../../src/store/reducers/auth";
import { errorAuth, requestAuth, receiveAuth } from "../../../src/store/actions/auth";

describe("auth reducer", () => {
    it("errorAuth action", () => {
        const expected: TAuthState = {
            authToken: "",
            pairingToken: "",
            isLoading: false,
            error: "Test"
        };

        const actual: TAuthState = auth(undefined, {
            type: getType(errorAuth),
            payload: "Test"
        });

        expect(actual).toEqual(expected);
    });

    it("requestAuth action", () => {
        const expected: TAuthState = {
            authToken: "",
            pairingToken: "",
            isLoading: true,
            error: ""
        };

        const actual: TAuthState = auth(undefined, {
            type: getType(requestAuth),
        });

        expect(actual).toEqual(expected);
    });

    it("receiveAuth action", () => {
        const expected: TAuthState = {
            authToken: "jflkadsjf",
            pairingToken: "jlkjlkjlkj",
            isLoading: false,
            error: ""
        };

        const actual: TAuthState = auth(undefined, {
            type: getType(receiveAuth),
            payload: {
                pairingToken: "jlkjlkjlkj",
                authToken: "jflkadsjf"
            }
        });

        expect(actual).toEqual(expected);
    });
});