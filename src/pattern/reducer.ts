import {Action} from 'redux';

import {Hole} from '~types';
import {combineContextReducers} from '~utils/redux';

import {REMOVE_TABLET, REMOVE_THREAD} from './actions';
import * as selection from './selection';
import * as threading from './threading';
import * as threads from './threads';

const MIN_THREADS = 2;
const MIN_TABLETS = 4;

const baseReducer = combineContextReducers({
    [threads.NAME]: threads.reducer,
    [threading.NAME]: threading.reducer,
    [selection.NAME]: selection.reducer,
});
export type StateType = ReturnType<typeof baseReducer>;

const emptyContext = {
    selection: {
        thread: 0,
        tablet: 0,
        hole: Hole.A,
    },
    threads: 0,
    tablets: 0,
};
const initial = baseReducer(undefined, {} as Action, emptyContext);
const reducer = (state: StateType = initial, action: Action): StateType => {
    if (action.type === REMOVE_THREAD && state.threads.colors.length <= MIN_THREADS) {
        return state;
    }
    if (action.type === REMOVE_TABLET && state.threading.threading.length <= MIN_TABLETS) {
        return state;
    }

    return baseReducer(state, action, {
        selection: state.selection,
        threads: state.threads.colors.length,
        tablets: state.threading.threading.length,
    });
};



export default reducer;
