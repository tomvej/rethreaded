import {Hole, Tablet, ThreadingType} from '~types';
import {insert, mapTablet, remove, update, updateTablet} from '~utils/func';

import {ADD_TABLET_AFTER, ADD_TABLET_BEFORE, REMOVE_TABLET, REMOVE_THREAD, SELECT_AND_APPLY_THREAD} from '../actions';
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

const reducer = (state: StateType = initialState, action: ActionType, selection: SelectionState, threadNumber: number): StateType => {
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
                    (tablet) => updateTablet(tablet, selection.hole, (thread) => {
                        const newThread = action.thread ?? selection.thread;
                        return newThread < threadNumber ? newThread : thread;
                    }),
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
        case REMOVE_THREAD:
            return update(state, 'threads',
                (threads) => threads.map((tablet) => mapTablet(tablet,
                    (thread) => (thread >= selection.thread && thread > 0) ? thread - 1 : thread,
                ))
            );
        case ADD_TABLET_AFTER:
            return {
                threading: insert(state.threading, selection.tablet + 1, state.threading[selection.tablet]),
                threads: insert(state.threads, selection.tablet + 1, state.threads[selection.tablet]),
            };
        case ADD_TABLET_BEFORE:
            return {
                threading: insert(state.threading, selection.tablet, state.threading[selection.tablet]),
                threads: insert(state.threads, selection.tablet, state.threads[selection.tablet]),
            };
        case REMOVE_TABLET:
            return {
                threading: remove(state.threading, selection.tablet),
                threads: remove(state.threads, selection.tablet),
            };
        default:
            return state;
    }
};

export default reducer;
