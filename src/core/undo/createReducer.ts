import {Action} from 'redux';

import {append} from '~utils/array';
import {ContextReducer} from '~utils/redux';

import {REDO, UNDO} from './actions';


export type UndoState<S> = {
    current: S | undefined;
    undo: Array<S>;
    redo: Array<S>;
}

const initialState = {
    current: undefined,
    undo: [],
    redo: []
};

const createReducer = <C, S, A extends Action>(reducer: ContextReducer<C, S, A>) => (state: UndoState<S> = initialState, action: A, context: C): UndoState<S> => {
    switch (action.type) {
        case UNDO: {
            if (state.undo.length > 0 && state.current) {
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
            if (state.redo.length > 0 && state.current) {
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
                    undo: state.current ? append(state.undo, state.current) : [],
                    redo: [],
                };
            } else {
                return state;
            }
        }
    }
};

export default createReducer;
