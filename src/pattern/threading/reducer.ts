import {Hole, Tablet, ThreadingType} from '~types';
import {seq, update, insert, remove} from '~utils/array';
import {combineContextReducers} from '~utils/redux';
import {map as mapTablet, update as updateTablet} from '~utils/tablet';

import {ADD_TABLET_AFTER, ADD_TABLET_BEFORE, REMOVE_TABLET, REMOVE_THREAD, SELECT_AND_APPLY_THREAD} from '../actions';
import {Context} from '../types';
import {ActionType, APPLY_THREAD, SET_S_THREADING, SET_Z_THREADING, TOGGLE_THREADING, TURN} from './actions';

const TABLET_NUMBER = 8;

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
            return update(selection.tablet, () => ThreadingType.S)(state);
        case SET_Z_THREADING:
            return update(selection.tablet, () => ThreadingType.Z)(state);
        case TOGGLE_THREADING:
            return update(action.tablet, toggleThreading)(state);
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
const turnTablet = (turns: number) => <T>(tablet: Tablet<T>): Tablet<T> => [
    tablet[getTurnedIndex(Hole.A + turns)],
    tablet[getTurnedIndex(Hole.B + turns)],
    tablet[getTurnedIndex(Hole.C + turns)],
    tablet[getTurnedIndex(Hole.D + turns)],
];

type ThreadsState = Array<Tablet<number>>;
const initialThreads: ThreadsState = seq(TABLET_NUMBER).map(() => [0, 1, 2, 1]);
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
            return state.map(mapTablet((thread) => (thread >= selection.thread && thread > 0) ? thread - 1 : thread));
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

const reducer = combineContextReducers({threads, threading});
export type StateType = ReturnType<typeof reducer>;
export default reducer;
