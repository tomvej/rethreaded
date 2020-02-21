import {Hole, Tablet, ThreadingType} from '~types';
import {update, updateTablet} from '~utils/func';
import {SELECT_AND_APPLY_THREAD} from '../actions';

import {SelectionState} from '../types';
import {ActionType, APPLY_THREAD, SET_S_THREADING, SET_Z_THREADING, TOGGLE_THREADING, TURN} from './actions';

const TABLET_NUMBER = 8;

export type StateType = {
    threading: Array<ThreadingType>;
    threads: Array<Tablet<number>>;
}

const initialState: StateType = {
    threading: Array(TABLET_NUMBER).fill(ThreadingType.S),
    threads: Array.from({length: TABLET_NUMBER}).map(() => [0, 1, 2, 1]),
};

const toggleThreading = (threading: ThreadingType): ThreadingType => {
    switch (threading) {
        case ThreadingType.S:
            return ThreadingType.Z;
        case ThreadingType.Z:
            return ThreadingType.S;
    }
};

const getTurnedIndex = (index: number): number => {
    const normalized = index % 4;
    return normalized >= 0 ? normalized : 4 + normalized;
};

const reducer = (state: StateType = initialState, action: ActionType, selection: SelectionState): StateType => {
    switch (action.type) {
        case SET_S_THREADING:
            return update(state, 'threading',
                (threading) => update(threading, selection.tablet, () => ThreadingType.S),
            );
        case SET_Z_THREADING:
            return update(state, 'threading',
                (threading) => update(threading, selection.tablet, () => ThreadingType.Z),
            );
        case TOGGLE_THREADING:
            return update(state, 'threading',
                (threading) => update(threading, action.tablet, toggleThreading),
            );
        case APPLY_THREAD:
            return update(state, 'threads',
                (threads) => update(threads, selection.tablet,
                    (tablet) => updateTablet(tablet, selection.hole, () => action.thread ?? selection.thread),
                ),
            );
        case SELECT_AND_APPLY_THREAD:
            return update(state, 'threads',
                (threads) => update(threads, action.tablet,
                    (tablet) => updateTablet(tablet, action.hole, () => selection.thread),
                ),
            );
        case TURN:
            return update(state, 'threads',
                (threads) => update(threads, selection.tablet,
                    (tablet): Tablet<number> => [
                        tablet[getTurnedIndex(Hole.A + action.turns)],
                        tablet[getTurnedIndex(Hole.B + action.turns)],
                        tablet[getTurnedIndex(Hole.C + action.turns)],
                        tablet[getTurnedIndex(Hole.D + action.turns)],
                    ],
                ),
            );
        default:
            return state;
    }
};

export default reducer;
