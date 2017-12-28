import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";

import reducers from "./reducers";
import sagas from "./sagas";

const sagaMiddleware: SagaMiddleware<{}> = createSagaMiddleware();

export default createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);
