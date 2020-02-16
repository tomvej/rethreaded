import {combineReducers} from 'redux';

import * as core from './core';
import * as pattern from './pattern';

const rootReducer = combineReducers({
    [core.NAME]: core.reducer,
    [pattern.NAME]: pattern.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
