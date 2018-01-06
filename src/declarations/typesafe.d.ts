import { ThunkAction } from "redux-thunk";
import { createAction, TypeGetter, FluxStandardAction } from "typesafe-actions";
import { IRootState } from "../store/reducers/index";
import Api from "../util/api";

declare module "typesafe-actions" {
  export function createAction<
    T extends string,
    AC extends (...args: any[]) => FluxStandardAction<T>
    >(typeString: T, creatorFunction?: AC): AC & TypeGetter<T>;

  // todo: better typing
  export function createAction<
    T extends string,
    AC extends (...args: any[]) => ThunkAction<Promise<void>, IRootState, null>
    >(typeString: T, createFunction: AC): AC & TypeGetter<T>;

  export function getType<T extends string>(actionCreator: TypeGetter<T>): T;
}
