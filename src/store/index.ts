import { createStore, Reducer, Store } from "redux";
import { persistStore, persistCombineReducers, PersistConfig, Persistor } from "redux-persist";
import storage from "redux-persist/es/storage";

import reducers, { IRootState } from "./reducers";

const config: PersistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"]
};

// todo: maybe better types
const rootReducer: Reducer<IRootState> = persistCombineReducers(config, reducers);

const store: Store<IRootState> = createStore(rootReducer);
const persistor: Persistor = persistStore(store);

export default store;
export { persistor };