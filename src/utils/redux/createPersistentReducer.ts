import {Action} from 'redux';

import {ContextReducer} from '~utils/redux/types';

const cleanup = window.location.search.includes('clear');

export default <C, S, A extends Action>(identifier: string, reducer: ContextReducer<C, S, A>): ContextReducer<C, S, A> => {
    // TODO io-ts input checking
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const initial: S | undefined = cleanup ? undefined : JSON.parse(localStorage.getItem(identifier) ?? '{}');

    let persistedState: S | undefined = undefined;
    window.addEventListener('unload', () => {
        localStorage.setItem(identifier, JSON.stringify(persistedState));
    });
    return (state: S | undefined = initial, action: A, context: C) => {
        persistedState = reducer(state, action, context);
        return persistedState;
    };
}
