import {Action} from 'redux';

import {Hole} from '~types';
import {combineContextReducers} from '~utils/redux';

import {REMOVE_TABLET, REMOVE_THREAD} from './actions';
import {MIN_TABLETS, MIN_THREADS} from './constants';
import * as selection from './selection';
import * as threading from './threading';
import {getTabletNumberFromModel} from './threading';
import * as threads from './threads';
import {getThreadNumberFromModel} from './threads';
import {getRowNumberFromModel} from './weaving';
import * as weaving from './weaving';

const baseReducer = combineContextReducers({
    [threads.NAME]: threads.reducer,
    [threading.NAME]: threading.reducer,
    [selection.NAME]: selection.reducer,
    [weaving.NAME]: weaving.reducer,
});
export type StateType = ReturnType<typeof baseReducer>;

const emptyContext = {
    selection: {
        thread: 0,
        tablet: 0,
        hole: Hole.A,
        row: 0,
    },
    threads: 0,
    tablets: 0,
    rows: 0,
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
        threads: getThreadNumberFromModel(state.threads),
        tablets: getTabletNumberFromModel(state.threading),
        rows: getRowNumberFromModel(state.weaving),
    });
};



export default reducer;
