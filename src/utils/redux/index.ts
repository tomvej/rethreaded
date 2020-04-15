import {Action, AnyAction, CombinedState} from 'redux';

import {ActionFromCRMO, ContextFromCRMO, ContextReducer, ContextReducersMapObject, StateFromCRMO} from './types';
export * from './types';
export {default as createPersistentReducer} from './createPersistentReducer';

export function combineContextReducers<C, S>(
    reducers: ContextReducersMapObject<C, S, any>
): ContextReducer<C, CombinedState<S>>;
export function combineContextReducers<C, S, A extends Action = AnyAction>(
    reducers: ContextReducersMapObject<C, S, A>
): ContextReducer<C, CombinedState<S>, A>;
export function combineContextReducers<M extends ContextReducersMapObject<any, any, any>>(
    reducers: M
): ContextReducer<
    ContextFromCRMO<M>,
    CombinedState<StateFromCRMO<M>>,
    ActionFromCRMO<M>
>;
export function combineContextReducers(reducers: ContextReducersMapObject) {
    const reducerEntries = Object.entries(reducers);
    return function combination(
        state: StateFromCRMO<typeof reducers> = {},
        action: AnyAction,
        context: ContextFromCRMO<typeof reducers>
    ) {
        let hasChanged = false;
        const nextState: StateFromCRMO<typeof reducers> = {};
        reducerEntries.forEach(([key, reducer]) => {
            const prevStateForKey = state[key];
            const nextStateForKey = reducer(prevStateForKey, action, context);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== prevStateForKey;
        });
        return hasChanged ? nextState : state;
    }
}
