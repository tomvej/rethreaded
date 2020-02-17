import {combineReducers} from 'redux';

import {ThreadingType} from '~types';

const TABLET_NUMBER = 8;

type ThreadingState = Array<ThreadingType>;

const initialThreading = Array(TABLET_NUMBER).fill(ThreadingType.S);

const threading = (state = initialThreading): ThreadingState => state;

const reducer = combineReducers({
    threading,
});

export type StateType = ReturnType<typeof reducer>;

export default reducer;
