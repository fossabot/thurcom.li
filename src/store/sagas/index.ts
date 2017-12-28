import { all, call, AllEffect } from "redux-saga/effects";

function* sagas(): IterableIterator<AllEffect> {
  yield all([]);
}

export default sagas;
