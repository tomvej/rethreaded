import {combineReducers} from 'redux';

import * as threading from './threading';
import * as threads from './threads'

const reducer = combineReducers({
    [threads.NAME]: threads.reducer,
    [threading.NAME]: threading.reducer,
});

export type PatternState = ReturnType<typeof reducer>;

export default reducer;
