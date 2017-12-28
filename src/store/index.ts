import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";

import reducers from "./reducers";

const sagaMiddleware: SagaMiddleware<{}> = createSagaMiddleware();

export default createStore(reducers, applyMiddleware(sagaMiddleware));
