import {Action} from 'redux';

import {ContextReducer} from '~utils/redux/types';

const cleanup = window.location.search.includes('clear');

const parseItem = <S>(identifier: string): S | undefined => {
    const value = localStorage.getItem(identifier);
    return value ? JSON.parse(value) as S : undefined;
}

export default <C, S, A extends Action>(identifier: string, reducer: ContextReducer<C, S, A>): ContextReducer<C, S, A> => {
    // TODO io-ts input checking
    const initial: S | undefined = cleanup ? undefined : parseItem(identifier);

    let persistedState: S | undefined = undefined;
    window.addEventListener('unload', () => {
        localStorage.setItem(identifier, JSON.stringify(persistedState));
    });
    return (state: S | undefined = initial, action: A, context: C) => {
        persistedState = reducer(state, action, context);
        return persistedState;
    };
}
