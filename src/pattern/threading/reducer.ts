import {combineReducers} from 'redux';

import {Hole, Tablet, ThreadingType} from '~types';

import {ActionType, SELECT_NEXT_HOLE, SELECT_PREV_HOLE} from './actions';

const TABLET_NUMBER = 8;

type ThreadingState = Array<ThreadingType>;

const initialThreading = Array(TABLET_NUMBER).fill(ThreadingType.S);

const threading = (state = initialThreading): ThreadingState => state;


type ThreadsState = Array<Tablet<number>>;

const initialThreads: ThreadsState = Array.from({length: TABLET_NUMBER}).map(() => [0, 1, 2, 1]);

const threads = (state = initialThreads): ThreadsState => state;


type SelectionState = {
    tablet: number;
    hole: Hole;
}

const initialSelection = {
    tablet: 0,
    hole: Hole.A,
};

const selection = (state = initialSelection): SelectionState => state;

const selectedHole = (state = Hole.A, action: ActionType): Hole => {
    switch (action.type) {
        case SELECT_NEXT_HOLE:
            return (state !== Hole.D) ? state + 1 : Hole.A;
        case SELECT_PREV_HOLE:
            return (state !== Hole.A) ? state - 1 : Hole.D;
        default:
            return state;
    }
};

const reducer = combineReducers({
    threading,
    threads,
    selection,
    selectedHole,
});

export type StateType = ReturnType<typeof reducer>;

export default reducer;
