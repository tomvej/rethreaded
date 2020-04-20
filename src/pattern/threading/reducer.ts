import {init, map, snoc} from 'fp-ts/es6/Array';
import {getOrElse} from 'fp-ts/es6/Option';
import {pipe} from 'fp-ts/es6/pipeable';

import {Hole, Tablet, ThreadingType} from '~types';
import {insert, remove, seq, update} from '~utils/array';
import {combineContextReducers} from '~utils/redux';
import {map as mapTablet, update as updateTablet} from '~utils/tablet';

import {
    ADD_TABLET_AFTER,
    ADD_TABLET_BEFORE,
    CLEAR,
    IMPORT_DESIGN,
    REMOVE_TABLET,
    REMOVE_THREAD,
    SELECT_AND_APPLY_THREAD,
} from '../actions';
import {initialThreadIds, MIN_TABLETS} from '../constants';
import {Context, TabletId, ThreadId} from '../types';
import {ActionType, APPLY_THREAD, SET_S_THREADING, SET_Z_THREADING, TOGGLE_THREADING, TURN} from './actions';

type TabletState = Array<TabletId>;
const initialTabletIds = [0, 1, 2, 3];
const tablets = (state: TabletState = initialTabletIds, action: ActionType): TabletState => {
    switch (action.type) {
        case ADD_TABLET_AFTER:
        case ADD_TABLET_BEFORE:
            return snoc(state, state.length);
        case REMOVE_TABLET:
            return pipe(
                state,
                init,
                getOrElse(() => [] as TabletId[]),
            );
        case IMPORT_DESIGN:
            return seq(action.data.threading.threads.length);
        case CLEAR:
            return initialTabletIds;
        default:
            return state;
    }
}

const toggleThreading = (threading: ThreadingType): ThreadingType => {
    switch (threading) {
        case ThreadingType.S:
            return ThreadingType.Z;
        case ThreadingType.Z:
            return ThreadingType.S;
    }
};

const initialThreading = Array(MIN_TABLETS).fill(ThreadingType.S);
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
        case CLEAR:
            return initialThreading;
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

type ThreadsState = Array<Tablet<ThreadId>>;
const initialThreads: ThreadsState = seq(MIN_TABLETS).map(() => [initialThreadIds[0], initialThreadIds[1], initialThreadIds[0], initialThreadIds[1]]);
const threads = (state = initialThreads, action: ActionType, {selection, threads}: Context): ThreadsState => {
    switch (action.type) {
        case APPLY_THREAD: {
            const newThread = action.thread ?? selection.thread;
            if (newThread < threads.length) {
                return update(selection.tablet, updateTablet(selection.hole, () => threads[newThread]))(state);
            } else {
                return state;
            }
        }
        case SELECT_AND_APPLY_THREAD:
            return update(action.tablet, updateTablet(action.hole, () => threads[selection.thread]))(state);
        case TURN:
            return update(selection.tablet, turnTablet(action.turns))(state);
        case REMOVE_THREAD: {
            const removedThread = action.thread ?? threads[selection.thread];
            const threadIndex = threads.indexOf(removedThread);
            const newThreadIndex = threadIndex > 0 ? threadIndex - 1 : threadIndex + 1;
            return state.map(mapTablet((thread) => thread === removedThread ? threads[newThreadIndex] : thread));
        }
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
            return pipe(
                action.data.threading.threads,
                map(mapTablet((index) => action.threadIds[index])),
            );
        case CLEAR:
            return initialThreads;
        default:
            return state;
    }
};

const reducer = combineContextReducers({threads, threading, tablets});
export type StateType = ReturnType<typeof reducer>;
export default reducer;
