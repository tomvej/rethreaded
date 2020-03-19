import {Hole} from '~types';
import {decrement, increment} from '~utils/func';
import {combineContextReducers} from '~utils/redux';

import {
    ADD_TABLET_AFTER,
    ADD_TABLET_BEFORE,
    ADD_THREAD,
    REMOVE_TABLET,
    REMOVE_THREAD,
    SELECT_AND_APPLY_THREAD, SELECT_AND_TOGGLE_DIRECTION,
} from '../actions';
import {Context} from '../types';
import {
    ActionType,
    NEXT_HOLE, NEXT_ROW,
    NEXT_TABLET,
    NEXT_THREAD,
    PREV_HOLE, PREV_ROW,
    PREV_TABLET,
    PREV_THREAD,
    SELECT_THREAD,
} from './actions';

const thread = (state = 0, action: ActionType, {threads}: Context): number => {
    switch (action.type) {
        case NEXT_THREAD:
            return increment(threads)(state);
        case PREV_THREAD:
            return decrement(threads)(state);
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
            return increment(tablets)(state);
        case PREV_TABLET:
            return decrement(tablets)(state);
        case SELECT_AND_APPLY_THREAD:
            return action.tablet;
        case ADD_TABLET_BEFORE:
            return action.tablet ?? state;
        case ADD_TABLET_AFTER:
            return (action.tablet ?? state) + 1;
        case REMOVE_TABLET:
            return Math.min(state, tablets - 1);
        case SELECT_AND_TOGGLE_DIRECTION:
            return action.tablet;
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

const row = (state = 0, action: ActionType, {rows}: Context): number => {
    switch (action.type) {
        case SELECT_AND_TOGGLE_DIRECTION:
            return action.row;
        case PREV_ROW:
            return decrement(rows)(state);
        case NEXT_ROW:
            return increment(rows)(state);
        default:
            return state;
    }
};

export default combineContextReducers({thread, tablet, hole, row});
