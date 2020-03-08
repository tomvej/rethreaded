import {Action} from 'redux';

import {Hole} from '~types';

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

const initial = {
    threads: threads.reducer(undefined, {} as Action, emptySelection),
    threading: threading.reducer(undefined, {} as Action, emptySelection),
    selection: selection.reducer(undefined, {} as Action, {threads: 0, tablets: 0}),
};

// FIXME
const reducer = (state: StateType = initial, action: Action): StateType => {
    return {
        threads: threads.reducer(state.threads, action, state.selection),
        threading: threading.reducer(state.threading, action, state.selection),
        selection: selection.reducer(state.selection, action, {
            threads: state.threads.colors.length,
            tablets: state.threading.threading.length,
        }),
    };
};



export default reducer;
