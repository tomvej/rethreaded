import {combineReducers} from 'redux';

import * as threads from './threads'

const reducer = combineReducers({
    [threads.NAME]: threads.reducer,
});

export type PatternState = ReturnType<typeof reducer>;

export default reducer;
