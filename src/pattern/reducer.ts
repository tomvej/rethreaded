import {Action} from 'redux';
import {createReducer, getCurrent} from '~core/undo';

import {Hole} from '~types';
import {combineContextReducers} from '~utils/redux';

import {REMOVE_ROW, REMOVE_TABLET, REMOVE_THREAD} from './actions';
import {MIN_ROWS, MIN_TABLETS, MIN_THREADS} from './constants';
import * as selection from './selection';
import * as threading from './threading';
import {getTabletNumberFromModel} from './threading';
import * as threads from './threads';
import {getThreadNumberFromModel} from './threads';
import {getRowNumberFromModel} from './weaving';
import * as weaving from './weaving';
import * as importExport from './importexport';

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

const modelReducer = combineContextReducers({
    [threads.NAME]: threads.reducer,
    [threading.NAME]: threading.reducer,
    [weaving.NAME]: weaving.reducer,
    [importExport.NAME]: importExport.modelReducer,
});
const baseReducer = combineContextReducers({
    model: createReducer(modelReducer, modelReducer(undefined, {} as Action, emptyContext)),
    [selection.NAME]: selection.reducer,
    [importExport.NAME]: importExport.stateReducer,

});
export type ModelType = ReturnType<typeof modelReducer>;
export type StateType = ReturnType<typeof baseReducer>;

const initial = baseReducer(undefined, {} as Action, emptyContext);
const reducer = (state: StateType = initial, action: Action): StateType => {
    const threadNumber = getThreadNumberFromModel(getCurrent(state.model).threads);
    const tabletNumber = getTabletNumberFromModel(getCurrent(state.model).threading);
    const rowNumber = getRowNumberFromModel(getCurrent(state.model).weaving);

    if (action.type === REMOVE_THREAD && threadNumber <= MIN_THREADS) {
        return state;
    }
    if (action.type === REMOVE_TABLET && tabletNumber <= MIN_TABLETS) {
        return state;
    }
    if (action.type === REMOVE_ROW && rowNumber <= MIN_ROWS) {
        return state;
    }

    return baseReducer(state, action, {
        selection: state.selection,
        threads: threadNumber,
        tablets: tabletNumber,
        rows: rowNumber,
    });
};



export default reducer;
