import {Action} from 'redux';

import {Hole} from '~types';
import {REMOVE_TABLET, REMOVE_THREAD} from './actions';

import * as selection from './selection';
import * as threading from './threading';
import * as threads from './threads';
import {SelectionState} from './types';

export type StateType = {
    threads: ReturnType<typeof threads.reducer>;
    threading: ReturnType<typeof threading.reducer>;
    selection: SelectionState;
}

const emptySelection = {
    thread: 0,
    tablet: 0,
    hole: Hole.A,
};

const MIN_THREADS = 2;
const MIN_TABLETS = 4;

const initial = {
    threads: threads.reducer(undefined, {} as Action, emptySelection),
    threading: threading.reducer(undefined, {} as Action, emptySelection, 0),
    selection: selection.reducer(undefined, {} as Action, {threads: 0, tablets: 0}),
};

// FIXME
const reducer = (state: StateType = initial, action: Action): StateType => {
    if (action.type === REMOVE_THREAD && state.threads.colors.length <= MIN_THREADS) {
        return state;
    }
    if (action.type === REMOVE_TABLET && state.threading.threading.length <= MIN_TABLETS) {
        return state;
    }
    return {
        threads: threads.reducer(state.threads, action, state.selection),
        threading: threading.reducer(state.threading, action, state.selection, state.threads.colors.length),
        selection: selection.reducer(state.selection, action, {
            threads: state.threads.colors.length,
            tablets: state.threading.threading.length,
        }),
    };
};



export default reducer;
