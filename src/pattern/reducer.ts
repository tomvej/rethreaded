import {Action, combineReducers} from 'redux';

import * as selection from './selection';
import * as threading from './threading';
import * as threads from './threads'
import {SelectionState} from './types';

const baseReducer = combineReducers({
    [threads.NAME]: threads.reducer,
    [threading.NAME]: threading.reducer,
});

export type StateType = {
    base: ReturnType<typeof baseReducer>;
    selection: SelectionState;
}

const initial = {
    base: baseReducer(undefined, {} as Action),
    selection: selection.reducer(undefined, {} as Action, {threads: 0, tablets: 0}),
};

// FIXME
const reducer = (state: StateType = initial, action: Action): StateType => {
    const nextSelection = selection.reducer(state.selection, action, {
        threads: state.base.threads.colors.length,
        tablets: state.base.threading.threading.length,
    });

    return {
        base: baseReducer(state.base, action),
        selection: nextSelection,
    };
};



export default reducer;
