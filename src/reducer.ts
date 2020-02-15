import {combineReducers} from 'redux';
import * as core from './core';

const rootReducer = combineReducers({
    [core.NAME]: core.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
