import { all, call, GenericAllEffect, ForkEffect } from "redux-saga/effects";

import watchFetchLogin from "./auth";

// todo: better type definition
export default function* sagas(): IterableIterator<GenericAllEffect<IterableIterator<ForkEffect>>> {
  yield all([watchFetchLogin()]);
}
