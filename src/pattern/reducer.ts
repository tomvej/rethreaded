import {Action} from 'redux';

import {Hole} from '~types';

import {REMOVE_TABLET, REMOVE_THREAD} from './actions';
import * as selection from './selection';
import * as threading from './threading';
import * as threads from './threads';
import {Context, SelectionState} from './types';

export type StateType = {
    threads: ReturnType<typeof threads.reducer>;
    threading: ReturnType<typeof threading.reducer>;
    selection: SelectionState;
}

const MIN_THREADS = 2;
const MIN_TABLETS = 4;

const initialContext = {
    selection: {
        thread: 0,
        tablet: 0,
        hole: Hole.A,
    },
    threads: 0,
    tablets: 0,
};

const initial = {
    threads: threads.reducer(undefined, {} as Action, initialContext),
    threading: threading.reducer(undefined, {} as Action, initialContext),
    selection: selection.reducer(undefined, {} as Action, initialContext),
};

// FIXME
const reducer = (state: StateType = initial, action: Action): StateType => {
    if (action.type === REMOVE_THREAD && state.threads.colors.length <= MIN_THREADS) {
        return state;
    }
    if (action.type === REMOVE_TABLET && state.threading.threading.length <= MIN_TABLETS) {
        return state;
    }

    const context: Context = {
        selection: state.selection,
        threads: state.threads.colors.length,
        tablets: state.threading.threading.length,
    };

    return {
        threads: threads.reducer(state.threads, action, context),
        threading: threading.reducer(state.threading, action, context),
        selection: selection.reducer(state.selection, action, context),
    };
};



export default reducer;
