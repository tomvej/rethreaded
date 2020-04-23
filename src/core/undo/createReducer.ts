import {Action} from 'redux';

import {append} from '~func/array';
import {ContextReducer} from '~utils/redux';

import {REDO, UNDO} from './actions';


export type UndoState<S> = {
    current: S;
    undo: Array<S>;
    redo: Array<S>;
}

const wrapState = <S>(state: S): UndoState<S> => ({
    current: state,
    undo: [],
    redo: [],
});

const createReducer = <C, S, A extends Action>(reducer: ContextReducer<C, S, A>, initialState: S) => (state = wrapState(initialState), action: A, context: C): UndoState<S> => {
    switch (action.type) {
        case UNDO: {
            if (state.undo.length > 0) {
                return {
                    current: state.undo[state.undo.length - 1],
                    undo: state.undo.slice(0, state.undo.length - 1),
                    redo: append(state.redo, state.current),
                }
            } else {
                return state;
            }
        }
        case REDO: {
            if (state.redo.length > 0) {
                return {
                    current: state.redo[state.redo.length - 1],
                    undo: append(state.undo, state.current),
                    redo: state.redo.slice(0, state.redo.length - 1),
                }
            } else {
                return state;
            }
        }
        default: {
            const newState = reducer(state.current, action, context);
            if (newState !== state.current) {
                return {
                    current: newState,
                    undo: append(state.undo, state.current),
                    redo: [],
                };
            } else {
                return state;
            }
        }
    }
};

export default createReducer;
