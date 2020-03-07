import {Action} from 'redux';

import {Hole} from '~types';

import * as selection from './selection';
import * as threading from './threading';
import * as threads from './threads'
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
    threads: threads.reducer(undefined),
    threading: threading.reducer(undefined, {} as Action, emptySelection),
    selection: selection.reducer(undefined, {} as Action, {threads: 0, tablets: 0}),
};

// FIXME
const reducer = (state: StateType = initial, action: Action): StateType => {
    const nextSelection = selection.reducer(state.selection, action, {
        threads: state.threads.length,
        tablets: state.threading.threading.length,
    });

    return {
        threads: threads.reducer(state.threads),
        threading: threading.reducer(state.threading, action, nextSelection),
        selection: nextSelection,
    };
};



export default reducer;
