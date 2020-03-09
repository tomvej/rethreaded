import {Hole} from '~types';
import {combineContextReducers} from '~utils/redux';

import {ADD_TABLET_AFTER, ADD_THREAD, REMOVE_TABLET, REMOVE_THREAD, SELECT_AND_APPLY_THREAD} from '../actions';
import {Context} from '../types';
import {
    ActionType,
    NEXT_HOLE,
    NEXT_TABLET,
    NEXT_THREAD,
    PREV_HOLE,
    PREV_TABLET,
    PREV_THREAD,
    SELECT_THREAD,
} from './actions';

const increment = (max: number) => (value: number): number => value < max ? value + 1 : 0;
const decrement = (max: number) => (value: number): number => value > 0 ? value - 1 : max;

const thread = (state = 0, action: ActionType, {threads}: Context): number => {
    switch (action.type) {
        case NEXT_THREAD:
            return increment(threads - 1)(state);
        case PREV_THREAD:
            return decrement(threads - 1)(state);
        case SELECT_THREAD:
            return action.thread < threads ? action.thread : state;
        case ADD_THREAD:
            return threads;
        case REMOVE_THREAD:
            return Math.min(state, threads - 1);
        default:
            return state;
    }
};

const tablet = (state = 0, action: ActionType, {tablets}: Context): number => {
    switch (action.type) {
        case NEXT_TABLET:
            return increment(tablets - 1)(state);
        case PREV_TABLET:
            return decrement(tablets - 1)(state);
        case SELECT_AND_APPLY_THREAD:
            return action.tablet;
        case ADD_TABLET_AFTER:
            return state + 1;
        case REMOVE_TABLET:
            return Math.min(state, tablets - 1);
        default:
            return state;
    }
};

const hole = (state = Hole.A, action: ActionType): Hole => {
    switch (action.type) {
        case NEXT_HOLE:
            return state !== Hole.D ? state + 1 : Hole.A;
        case PREV_HOLE:
            return state !== Hole.A ? state - 1 : Hole.D;
        case SELECT_AND_APPLY_THREAD:
            return action.hole;
        default:
            return state;
    }
};

export default combineContextReducers({thread, tablet, hole});
