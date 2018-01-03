import { createStore, Reducer, Store, applyMiddleware } from "redux";
import {
  persistStore,
  persistCombineReducers,
  PersistConfig,
  Persistor
} from "redux-persist";
import ReduxThunk from "redux-thunk";
import storage from "redux-persist/es/storage";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import reducers, { IRootState } from "./reducers";

const config: PersistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"]
};

// todo: maybe better types
const rootReducer: Reducer<IRootState> = persistCombineReducers(
  config,
  reducers
);

const store: Store<IRootState> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
const persistor: Persistor = persistStore(store);

export default store;
export { persistor };
