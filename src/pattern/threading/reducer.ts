import {array, map, unsafeDeleteAt} from 'fp-ts/es6/Array';
import {pipe} from 'fp-ts/es6/pipeable';
import {fromFoldable, map as mapRecord} from 'fp-ts/es6/Record';
import {getLastSemigroup} from 'fp-ts/es6/Semigroup';

import {Hole, Tablet, ThreadingType} from '~types';
import {insert} from '~utils/array';
import {addIndices} from '~utils/func';
import * as record from '~utils/record';
import {fromEntries} from '~utils/record';
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
            return insert(state, index, action.newId);
        }
        case ADD_TABLET_BEFORE: {
            const index = action.tablet !== undefined ? state.indexOf(action.tablet) : selection.tablet;
            return insert(state, index - 1, action.newId);
        }
        case REMOVE_TABLET: {
            const index = action.tablet !== undefined ? state.indexOf(action.tablet) : selection.tablet;
            return unsafeDeleteAt(index, state);
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
const initialThreading: ThreadingState = record.fromEntries(initialTabletIds.map((id) => [id, ThreadingType.S]));
const threading = (state = initialThreading, action: ActionType, {selection, tablets}: Context): ThreadingState => {
    switch (action.type) {
        case SET_S_THREADING:
            return record.update(tablets[selection.tablet], () => ThreadingType.S)(state);
        case SET_Z_THREADING:
            return record.update(tablets[selection.tablet], () => ThreadingType.Z)(state);
        case TOGGLE_THREADING:
            return record.update(action.tablet, toggleThreading)(state);
        case ADD_TABLET_AFTER: {
            const tablet = action.tablet ?? tablets[selection.tablet];
            return record.update(action.newId, () => state[tablet])(state);
        }
        case ADD_TABLET_BEFORE: {
            const tablet = action.tablet ?? tablets[selection.tablet];
            return record.update(tablet, () => state[tablet])(state);
        }
        case REMOVE_TABLET:
            return record.remove(action.tablet ?? tablets[selection.tablet])(state);
        case IMPORT_DESIGN:
            return pipe(
                action.data.threading.threading,
                addIndices((i) => action.tabletIds[i]),
                fromFoldable(getLastSemigroup<ThreadingType>(), array)
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
const initialThreads: ThreadsState = fromEntries(initialTabletIds.map(
    (id) => [id, [initialThreadIds[0], initialThreadIds[1], initialThreadIds[0], initialThreadIds[1]]]
));

const threads = (state = initialThreads, action: ActionType, {selection, threads, tablets}: Context): ThreadsState => {
    switch (action.type) {
        case APPLY_THREAD: {
            const newThread = action.thread ?? selection.thread;
            if (newThread < threads.length) {
                return record.update(tablets[selection.tablet], updateTablet(selection.hole, () => threads[newThread]))(state);
            } else {
                return state;
            }
        }
        case SELECT_AND_APPLY_THREAD:
            return record.update(action.tablet, updateTablet(action.hole, () => threads[selection.thread]))(state);
        case TURN:
            return record.update(tablets[selection.tablet], turnTablet(action.turns))(state);
        case REMOVE_THREAD: {
            const removedThread = action.thread ?? threads[selection.thread];
            const threadIndex = threads.indexOf(removedThread);
            const newThreadIndex = threadIndex > 0 ? threadIndex - 1 : threadIndex + 1;
            return mapRecord(
                tablet.map((thread: ThreadId) => thread === removedThread ? threads[newThreadIndex] : thread)
            )(state);
        }
        case ADD_TABLET_AFTER: {
            const tablet = action.tablet ?? tablets[selection.tablet];
            return record.update(action.newId, () => state[tablet])(state);
        }
        case ADD_TABLET_BEFORE: {
            const tablet = action.tablet ?? tablets[selection.tablet];
            return record.update(action.newId, () => state[tablet])(state);
        }
        case REMOVE_TABLET:
            return record.remove(action.tablet ?? tablets[selection.tablet])(state);
        case IMPORT_DESIGN:
            return pipe(
                action.data.threading.threads,
                map(tablet.map((index) => action.threadIds[index])),
                addIndices((i) => action.tabletIds[i]),
                fromFoldable(getLastSemigroup<Tablet<ThreadId>>(), array),
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
