import {Action, AnyAction} from 'redux';

export type ContextReducer<C = any, S = any, A extends Action = AnyAction> = (state: S | undefined, action: A, context: C) => S;

export type ContextReducersMapObject<C = any, S = any, A extends Action = Action> = {
    [K in keyof S]: ContextReducer<C, S[K], A>
};

export type ContextFromCRMO<M> = M extends ContextReducersMapObject<infer C, any, any> ? C : never;

export type StateFromCRMO<M> = M extends ContextReducersMapObject<any, any, any>
    ? {[P in keyof M]: M[P] extends ContextReducer<any, infer S, any> ? S : never}
    : never;

export type ReducerFromCRMO<M> = M extends {[P in keyof M]: infer R}
    ? R extends ContextReducer<any, any, any> ? R : never
    : never

export type ActionFromContextReducer<R> = R extends ContextReducer<any, any, infer A> ? A : never;

export type ActionFromCRMO<M> = M extends ContextReducersMapObject<any, any, any>
    ? ActionFromContextReducer<ReducerFromCRMO<M>>
    : never
