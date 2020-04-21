import {init, snoc} from 'fp-ts/es6/Array';
import {getOrElse} from 'fp-ts/es6/Option';
import {pipe} from 'fp-ts/es6/pipeable';

import {Hole, Tablet, ThreadingType} from '~types';
import {seq} from '~utils/array';
import * as record from '~utils/record';
import {fromEntries} from '~utils/record';
import {combineContextReducers} from '~utils/redux';
import {update as updateTablet} from '~utils/tablet';

import {
    ADD_TABLET_AFTER,
    ADD_TABLET_BEFORE,
    CLEAR,
    IMPORT_DESIGN,
    REMOVE_TABLET,
    REMOVE_THREAD,
    SELECT_AND_APPLY_THREAD,
} from '../actions';
import {initialThreadIds} from '../constants';
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

type ThreadingState = Record<TabletId, ThreadingType>;
const initialThreading: ThreadingState = record.fromEntries(initialTabletIds.map((id) => [id, ThreadingType.S]));
const threading = (state = initialThreading, action: ActionType, {selection}: Context): ThreadingState => {
    switch (action.type) {
        case SET_S_THREADING:
            return record.update(selection.tablet, () => ThreadingType.S)(state);
        case SET_Z_THREADING:
            return record.update(selection.tablet, () => ThreadingType.Z)(state);
        case TOGGLE_THREADING:
            return record.update(action.tablet, toggleThreading)(state);
        case ADD_TABLET_AFTER: {
            const tablet = action.tablet ?? selection.tablet;
            return record.update(tablet + 1, () => state[tablet])(state);
        }
        case ADD_TABLET_BEFORE: {
            const tablet = action.tablet ?? selection.tablet;
            return record.update(tablet, () => state[tablet])(state);
        }
        case REMOVE_TABLET:
            return record.remove(action.tablet ?? selection.tablet)(state);
        case IMPORT_DESIGN:
            return {}; // FIXME
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

type ThreadsState = Record<TabletId, Tablet<ThreadId>>;
const initialThreads: ThreadsState = fromEntries(initialTabletIds.map(
    (id) => [id, [initialThreadIds[0], initialThreadIds[1], initialThreadIds[0], initialThreadIds[1]]]
));

const threads = (state = initialThreads, action: ActionType, {selection, threads}: Context): ThreadsState => {
    switch (action.type) {
        case APPLY_THREAD: {
            const newThread = action.thread ?? selection.thread;
            if (newThread < threads.length) {
                return record.update(selection.tablet, updateTablet(selection.hole, () => threads[newThread]))(state);
            } else {
                return state;
            }
        }
        case SELECT_AND_APPLY_THREAD:
            return record.update(action.tablet, updateTablet(action.hole, () => threads[selection.thread]))(state);
        case TURN:
            return record.update(selection.tablet, turnTablet(action.turns))(state);
        case REMOVE_THREAD: {
            const removedThread = action.thread ?? threads[selection.thread];
            const threadIndex = threads.indexOf(removedThread);
            const newThreadIndex = threadIndex > 0 ? threadIndex - 1 : threadIndex + 1;
            return {}; // FIXME
            //return mapRecord(mapTablet((thread) => thread === removedThread ? threads[newThreadIndex] : thread))(state);
        }
        case ADD_TABLET_AFTER: {
            const tablet = action.tablet ?? selection.tablet;
            return record.update(tablet + 1, () => state[tablet])(state);
        }
        case ADD_TABLET_BEFORE: {
            const tablet = action.tablet ?? selection.tablet;
            return record.update(tablet, () => state[tablet])(state);
        }
        case REMOVE_TABLET:
            return record.remove(action.tablet ?? selection.tablet)(state);
        case IMPORT_DESIGN:
            return {}; // FIXME
            /*return pipe(
                action.data.threading.threads,
                map(mapTablet((index) => action.threadIds[index])),
            );*/
        case CLEAR:
            return initialThreads;
        default:
            return state;
    }
};

const reducer = combineContextReducers({threads, threading, tablets});
export type StateType = ReturnType<typeof reducer>;
export default reducer;
