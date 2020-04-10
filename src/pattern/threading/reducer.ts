import {Hole, Tablet, ThreadingType} from '~types';
import {insert, remove, seq, update} from '~utils/array';
import {combineContextReducers} from '~utils/redux';
import {map as mapTablet, update as updateTablet} from '~utils/tablet';

import {
    ADD_TABLET_AFTER,
    ADD_TABLET_BEFORE,
    IMPORT_DESIGN,
    REMOVE_TABLET,
    REMOVE_THREAD,
    SELECT_AND_APPLY_THREAD,
} from '../actions';
import {INIT_TABLET_NUMBER} from '../constants';
import {Context} from '../types';
import {ActionType, APPLY_THREAD, SET_S_THREADING, SET_Z_THREADING, TOGGLE_THREADING, TURN} from './actions';

const toggleThreading = (threading: ThreadingType): ThreadingType => {
    switch (threading) {
        case ThreadingType.S:
            return ThreadingType.Z;
        case ThreadingType.Z:
            return ThreadingType.S;
    }
};

const initialThreading = Array(INIT_TABLET_NUMBER).fill(ThreadingType.S);
const threading = (state = initialThreading, action: ActionType, {selection}: Context): Array<ThreadingType> => {
    switch (action.type) {
        case SET_S_THREADING:
            return update(selection.tablet, () => ThreadingType.S)(state);
        case SET_Z_THREADING:
            return update(selection.tablet, () => ThreadingType.Z)(state);
        case TOGGLE_THREADING:
            return update(action.tablet, toggleThreading)(state);
        case ADD_TABLET_AFTER: {
            const tablet = action.tablet ?? selection.tablet;
            return insert(state, tablet + 1, state[tablet]);
        }
        case ADD_TABLET_BEFORE: {
            const tablet = action.tablet ?? selection.tablet;
            return insert(state, tablet, state[tablet]);
        }
        case REMOVE_TABLET:
            return remove(action.tablet ?? selection.tablet)(state);
        case IMPORT_DESIGN:
            return action.data.threading.threading;
        default:
            return state;
    }
};

const getTurnedIndex = (index: number): number => {
    const normalized = index % 4;
    return normalized >= 0 ? normalized : 4 + normalized;
};
const turnTablet = (turns: number) => <T>(tablet: Tablet<T>): Tablet<T> => [
    tablet[getTurnedIndex(Hole.A + turns)],
    tablet[getTurnedIndex(Hole.B + turns)],
    tablet[getTurnedIndex(Hole.C + turns)],
    tablet[getTurnedIndex(Hole.D + turns)],
];

type ThreadsState = Array<Tablet<number>>;
const initialThreads: ThreadsState = seq(INIT_TABLET_NUMBER).map(() => [0, 1, 2, 1]);
const threads = (state = initialThreads, action: ActionType, {selection, threads}: Context): ThreadsState => {
    switch (action.type) {
        case APPLY_THREAD: {
            const newThread = action.thread ?? selection.thread;
            if (newThread < threads) {
                return update(selection.tablet, updateTablet(selection.hole, () => newThread))(state);
            } else {
                return state;
            }
        }
        case SELECT_AND_APPLY_THREAD:
            return update(action.tablet, updateTablet(action.hole, () => selection.thread))(state);
        case TURN:
            return update(selection.tablet, turnTablet(action.turns))(state);
        case REMOVE_THREAD:
            return state.map(mapTablet((thread) => (thread >= (action.thread ?? selection.thread) && thread > 0) ? thread - 1 : thread));
        case ADD_TABLET_AFTER: {
            const tablet = action.tablet ?? selection.tablet;
            return insert(state, tablet + 1, state[tablet]);
        }
        case ADD_TABLET_BEFORE: {
            const tablet = action.tablet ?? selection.tablet;
            return insert(state, tablet, state[tablet]);
        }
        case REMOVE_TABLET:
            return remove(action.tablet ?? selection.tablet)(state);
        case IMPORT_DESIGN:
            return action.data.threading.colors;
        default:
            return state;
    }
};

const reducer = combineContextReducers({threads, threading});
export type StateType = ReturnType<typeof reducer>;
export default reducer;
