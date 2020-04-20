import {Hole} from '~types';
import {decrement, increment} from '~utils/func';
import {combineContextReducers} from '~utils/redux';

import {
    ADD_ROW_AFTER,
    ADD_ROW_BEFORE,
    ADD_TABLET_AFTER,
    ADD_TABLET_BEFORE,
    ADD_THREAD,
    CLEAR,
    IMPORT_DESIGN,
    REMOVE_ROW,
    REMOVE_TABLET,
    REMOVE_THREAD,
    SELECT_AND_APPLY_THREAD,
    SELECT_AND_TOGGLE_DIRECTION,
} from '../actions';
import {Context, RowId, TabletId, ThreadId} from '../types';
import {
    ActionType,
    NEXT_HOLE,
    NEXT_ROW,
    NEXT_TABLET,
    NEXT_THREAD,
    PREV_HOLE,
    PREV_ROW,
    PREV_TABLET,
    PREV_THREAD,
    SELECT_THREAD,
} from './actions';

const clamp = (number: number, max: number): number => Math.max(Math.min(max - 1, number), 0);

const thread = (state: ThreadId = 0, action: ActionType, {threads}: Context): ThreadId => {
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
            return Math.min(state, threads - 2);
        case IMPORT_DESIGN:
        case CLEAR:
            return 0;
        default:
            return clamp(state, threads);
    }
};

const tablet = (state: TabletId = 0, action: ActionType, {tablets}: Context): TabletId => {
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
            return Math.min(state, tablets - 2);
        case SELECT_AND_TOGGLE_DIRECTION:
            return action.tablet;
        case IMPORT_DESIGN:
        case CLEAR:
            return 0;
        default:
            return clamp(state, tablets);
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
        case IMPORT_DESIGN:
        case CLEAR:
            return Hole.A;
        default:
            return state;
    }
};

const row = (state: RowId = 0, action: ActionType, {rows}: Context): RowId => {
    switch (action.type) {
        case SELECT_AND_TOGGLE_DIRECTION:
            return action.row;
        case PREV_ROW:
            return decrement(rows)(state);
        case NEXT_ROW:
            return increment(rows)(state);
        case ADD_ROW_AFTER:
            return (action.row ?? state) + 1;
        case ADD_ROW_BEFORE:
            return action.row ?? state;
        case REMOVE_ROW:
            return Math.min(state, rows - 2);
        case IMPORT_DESIGN:
        case CLEAR:
            return 0;
        default:
            return clamp(state, rows);
    }
};

export default combineContextReducers({thread, tablet, hole, row});
