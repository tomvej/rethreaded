import {combineReducers} from 'redux';

import {Tablet, ThreadingType} from '~types';

const TABLET_NUMBER = 8;

type ThreadingState = Array<ThreadingType>;

const initialThreading = Array(TABLET_NUMBER).fill(ThreadingType.S);

const threading = (state = initialThreading): ThreadingState => state;


type ThreadsState = Array<Tablet<number>>;

const initialThreads: ThreadsState = Array.from({length: TABLET_NUMBER}).map(() => [0, 1, 2, 1]);

const threads = (state = initialThreads): ThreadsState => state;

const reducer = combineReducers({
    threading,
    threads,
});

export type StateType = ReturnType<typeof reducer>;

export default reducer;
