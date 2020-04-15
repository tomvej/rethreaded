import {Action} from 'redux';

import * as undo from '~core/undo';
import {Hole} from '~types';
import {combineContextReducers, createPersistentReducer} from '~utils/redux';

import {REMOVE_ROW, REMOVE_TABLET, REMOVE_THREAD} from './actions';
import {MIN_ROWS, MIN_TABLETS, MIN_THREADS} from './constants';
import * as importExport from './importexport';
import * as preview from './preview';
import * as selection from './selection';
import * as threading from './threading';
import {getTabletNumberFromModel} from './threading';
import * as threads from './threads';
import {getThreadNumberFromModel} from './threads';
import {getRowNumberFromModel} from './weaving';
import * as weaving from './weaving';

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

const modelReducer = createPersistentReducer('patternModel', combineContextReducers({
    [threads.NAME]: threads.modelReducer,
    [threading.NAME]: threading.reducer,
    [weaving.NAME]: weaving.reducer,
    [importExport.NAME]: importExport.modelReducer,
}));
const baseReducer = combineContextReducers({
    model: undo.createReducer(modelReducer, modelReducer(undefined, {} as Action, emptyContext)),
    [selection.NAME]: selection.reducer,
    [importExport.NAME]: importExport.stateReducer,
    [threads.NAME]: threads.stateReducer,
    [preview.NAME]: preview.reducer,

});
export type ModelType = ReturnType<typeof modelReducer>;
export type StateType = ReturnType<typeof baseReducer>;

const initial = baseReducer(undefined, {} as Action, emptyContext);
const reducer = (state: StateType = initial, action: Action): StateType => {
    const threadNumber = getThreadNumberFromModel(undo.getCurrent(state.model).threads);
    const tabletNumber = getTabletNumberFromModel(undo.getCurrent(state.model).threading);
    const rowNumber = getRowNumberFromModel(undo.getCurrent(state.model).weaving);

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
