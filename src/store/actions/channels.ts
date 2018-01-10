import { AnyAction, Dispatch } from "redux";
import { createAction, getType } from "typesafe-actions";

import Api, { IChannelResponse } from "../../util/api";
import { IRootState } from "../reducers/index";

// tslint:disable-next-line typedef
export const requestChannels = createAction(
	"REQUEST_CHANNELS",
	() => async (dispatch: Dispatch<IRootState>, getState: () => IRootState) => {
		dispatch({ type: getType(requestChannels) });
		const api: Api = new Api(getState);
		try {
			const channels: IChannelResponse = await api.getChannels();
			dispatch(receiveChannels(channels));
		} catch (error) {
			dispatch(errorChannels(error));
		}
	}
);

// tslint:disable-next-line typedef
export const receiveChannels = createAction(
	"RECEIVE_CHANNELS",
	(channels: IChannelResponse) => ({
		type: "RECEIVE_CHANNELS",
		payload: channels
	})
);

// tslint:disable-next-line typedef
export const errorChannels = createAction("ERROR_CHANNELS", error => ({
	type: "ERROR_CHANNELS",
	payload: error
}));
