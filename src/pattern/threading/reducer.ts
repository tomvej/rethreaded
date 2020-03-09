import {Hole, Tablet, ThreadingType} from '~types';
import {insert, mapTablet, remove, seq, update, updateTablet} from '~utils/func';
import {combineContextReducers} from '~utils/redux';

import {ADD_TABLET_AFTER, ADD_TABLET_BEFORE, REMOVE_TABLET, REMOVE_THREAD, SELECT_AND_APPLY_THREAD} from '../actions';
import {Context} from '../types';
import {ActionType, APPLY_THREAD, SET_S_THREADING, SET_Z_THREADING, TOGGLE_THREADING, TURN} from './actions';

const TABLET_NUMBER = 8;

export type StateType = { // TODO remove
    threading: Array<ThreadingType>;
    threads: Array<Tablet<number>>;
}

const toggleThreading = (threading: ThreadingType): ThreadingType => {
    switch (threading) {
        case ThreadingType.S:
            return ThreadingType.Z;
        case ThreadingType.Z:
            return ThreadingType.S;
    }
};

const initialThreading = Array(TABLET_NUMBER).fill(ThreadingType.S);
const threading = (state = initialThreading, action: ActionType, {selection}: Context): Array<ThreadingType> => {
    switch (action.type) {
        case SET_S_THREADING:
            return update(state, selection.tablet, () => ThreadingType.S);
        case SET_Z_THREADING:
            return update(state, selection.tablet, () => ThreadingType.Z);
        case TOGGLE_THREADING:
            return update(state, action.tablet, toggleThreading);
        case ADD_TABLET_AFTER:
            return insert(state, selection.tablet + 1, state[selection.tablet]);
        case ADD_TABLET_BEFORE:
            return insert(state, selection.tablet, state[selection.tablet]);
        case REMOVE_TABLET:
            return remove(state, selection.tablet);
        default:
            return state;
    }
};

const getTurnedIndex = (index: number): number => {
    const normalized = index % 4;
    return normalized >= 0 ? normalized : 4 + normalized;
};

type ThreadsState = Array<Tablet<number>>;
const initialThreads: ThreadsState = seq(TABLET_NUMBER).map(() => [0, 1, 2, 1]);
const threads = (state = initialThreads, action: ActionType, {selection, threads}: Context): ThreadsState => {
    switch (action.type) {
        case APPLY_THREAD: {
            const newThread = action.thread ?? selection.thread;
            if (newThread < threads) {
                return update(state, selection.tablet, (tablet) => updateTablet(tablet, selection.hole, () => newThread));
            } else {
                return state;
            }
        }
        case SELECT_AND_APPLY_THREAD:
            return update(state, action.tablet, (tablet) => updateTablet(tablet, action.hole, () => selection.thread));
        case TURN:
            return update(state, selection.tablet, (tablet): Tablet<number> => [
                tablet[getTurnedIndex(Hole.A + action.turns)],
                tablet[getTurnedIndex(Hole.B + action.turns)],
                tablet[getTurnedIndex(Hole.C + action.turns)],
                tablet[getTurnedIndex(Hole.D + action.turns)],
            ]);
        case REMOVE_THREAD:
            return state.map((tablet) => mapTablet(tablet, (thread) => (thread >= selection.thread && thread > 0) ? thread - 1 : thread));
        case ADD_TABLET_AFTER:
            return insert(state, selection.tablet + 1, state[selection.tablet]);
        case ADD_TABLET_BEFORE:
            return insert(state, selection.tablet, state[selection.tablet]);
        case REMOVE_TABLET:
            return remove(state, selection.tablet);
        default:
            return state;
    }
};

export default combineContextReducers({threads, threading});
