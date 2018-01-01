import { createStore, applyMiddleware, Reducer, Store } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { persistStore, persistCombineReducers, PersistConfig, Persistor } from "redux-persist";
import storage from "redux-persist/es/storage";

import reducers, { IRootState } from "./reducers";
import sagas from "./sagas";

const config: PersistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"]
};

// todo: maybe better types
const rootReducer: Reducer<IRootState> = persistCombineReducers(config, reducers);

const sagaMiddleware: SagaMiddleware<{}> = createSagaMiddleware();

const store: Store<IRootState> = createStore(rootReducer, applyMiddleware(sagaMiddleware));
const persistor: Persistor = persistStore(store);

sagaMiddleware.run(sagas);

export default store;
export { persistor };