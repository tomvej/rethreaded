import {combineReducers} from 'redux';
import * as focus from './focus';

const reducer = combineReducers({
    [focus.NAME]: focus.reducer,
});

export type CoreState = ReturnType<typeof reducer>;

export default reducer;
