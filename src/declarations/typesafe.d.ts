import { ThunkAction } from "redux-thunk";
import { createAction, TypeGetter, FluxStandardAction } from "typesafe-actions";

declare module "typesafe-actions" {
  export function createAction<
    T extends string,
    AC extends (...args: any[]) => FluxStandardAction<T>
  >(typeString: T, creatorFunction?: AC): AC & TypeGetter<T>;

  export function createAction<
    T extends string,
    AC extends (...args: any[]) => ThunkAction<any, any, any>
  >(typeString: T, createFunction: AC): AC & TypeGetter<T>;

  export function getType<T extends string>(actionCreator: TypeGetter<T>): T;
}
