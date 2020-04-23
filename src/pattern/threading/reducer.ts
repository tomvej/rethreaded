import {getOrElse} from 'fp-ts/es6/Option';
import {pipe} from 'fp-ts/es6/pipeable';
import {getLastSemigroup} from 'fp-ts/es6/Semigroup';

import * as array from '~func/array';
import * as record from '~func/record';
import {Hole, Tablet, ThreadingType} from '~types';
import {combineContextReducers} from '~utils/redux';
import * as tablet from '~utils/tablet';
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
import {initialTabletIds, initialThreadIds} from '../constants';
import {Context, TabletId, ThreadId} from '../types';
import {ActionType, APPLY_THREAD, SET_S_THREADING, SET_Z_THREADING, TOGGLE_THREADING, TURN} from './actions';

type TabletState = Array<TabletId>;
const tablets = (state: TabletState = initialTabletIds, action: ActionType, {selection}: Context): TabletState => {
    switch (action.type) {
        case ADD_TABLET_AFTER: {
            const index = action.tablet !== undefined ? state.indexOf(action.tablet) : selection.tablet;
            return pipe(
                state,
                array.insertAt(index + 1, action.newId),
                getOrElse(() => state),
            )
        }
        case ADD_TABLET_BEFORE: {
            const index = action.tablet !== undefined ? state.indexOf(action.tablet) : selection.tablet;
            return pipe(
                state,
                array.insertAt(index, action.newId),
                getOrElse(() => state),
            )
        }
        case REMOVE_TABLET: {
            const index = action.tablet !== undefined ? state.indexOf(action.tablet) : selection.tablet;
            return pipe(
                state,
                array.deleteAt(index),
                getOrElse(() => state),
            )
        }
        case IMPORT_DESIGN:
            return action.tabletIds;
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
const initialThreading: ThreadingState = pipe(
    initialTabletIds,
    array.addValues(() => ThreadingType.S),
    record.getFromEntries(),
);

const threading = (state = initialThreading, action: ActionType, {selection, tablets}: Context): ThreadingState => {
    switch (action.type) {
        case SET_S_THREADING:
            return pipe(
                state,
                record.updateAt(tablets[selection.tablet], ThreadingType.S),
                getOrElse(() => state),
            );
        case SET_Z_THREADING:
            return pipe(
                state,
                record.updateAt(tablets[selection.tablet], ThreadingType.Z),
                getOrElse(() => state),
            )
        case TOGGLE_THREADING:
            return pipe(
                state,
                record.modifyAt(action.tablet, toggleThreading),
                getOrElse(() => state),
            )
        case ADD_TABLET_AFTER:
        case ADD_TABLET_BEFORE: {
            const tablet = action.tablet ?? tablets[selection.tablet];
            return pipe(
                state,
                record.updateAt(action.newId, state[tablet]),
                getOrElse(() => state),
            )
        }
        case REMOVE_TABLET:
            return pipe(
                state,
                record.deleteAt(action.tablet ?? tablets[selection.tablet]),
            );
        case IMPORT_DESIGN:
            return pipe(
                action.data.threading.threading,
                array.addIndices((i) => action.tabletIds[i]),
                record.getFromEntries(),
            );
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
const initialThreads: ThreadsState = pipe(
    initialTabletIds,
    array.addValues(() => [initialThreadIds[0], initialThreadIds[1], initialThreadIds[0], initialThreadIds[1]] as Tablet<ThreadId>),
    record.getFromEntries(),
)

const threads = (state = initialThreads, action: ActionType, {selection, threads, tablets}: Context): ThreadsState => {
    switch (action.type) {
        case APPLY_THREAD: {
            const newThread = action.thread ?? selection.thread;
            if (newThread < threads.length) {
                return pipe(
                    state,
                    record.modifyAt(tablets[selection.tablet], updateTablet(selection.hole, () => threads[newThread])),
                    getOrElse(() => state),
                );
            } else {
                return state;
            }
        }
        case SELECT_AND_APPLY_THREAD:
            return pipe(
                state,
                record.modifyAt(action.tablet, updateTablet(action.hole, () => threads[selection.thread])),
                getOrElse(() => state),
            );
        case TURN:
            return pipe(
                state,
                record.modifyAt(tablets[selection.tablet], turnTablet(action.turns)),
                getOrElse(() => state),
            );
        case REMOVE_THREAD: {
            const removedThread = action.thread ?? threads[selection.thread];
            const threadIndex = threads.indexOf(removedThread);
            const newThreadIndex = threadIndex > 0 ? threadIndex - 1 : threadIndex + 1;
            return pipe(
                state,
                record.map(tablet.map((thread: ThreadId) => thread === removedThread ? threads[newThreadIndex] : thread)),
            );
        }
        case ADD_TABLET_AFTER:
        case ADD_TABLET_BEFORE: {
            const tablet = action.tablet ?? tablets[selection.tablet];
            return pipe(
                state,
                record.insertAt(action.newId, state[tablet]),
            );
        }
        case REMOVE_TABLET:
            return pipe(
                state,
                record.deleteAt(action.tablet ?? tablets[selection.tablet]),
            );
        case IMPORT_DESIGN:
            return pipe(
                action.data.threading.threads,
                array.map(tablet.map((index) => action.threadIds[index])),
                array.addIndices((i) => action.tabletIds[i]),
                record.getFromEntries(),
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
