import {Direction} from '~types';
import {insert, remove, seq, update} from '~utils/array';

import {
    ADD_ROW_AFTER, ADD_ROW_BEFORE,
    ADD_TABLET_AFTER,
    ADD_TABLET_BEFORE, REMOVE_ROW,
    REMOVE_TABLET,
    SELECT_AND_TOGGLE_DIRECTION,
} from '../actions';
import {INIT_TABLET_NUMBER} from '../constants';
import {Context} from '../types';
import {ActionType, SET_DIRECTION, TOGGLE_DIRECTION} from './actions';

const INIT_ROWS = 4;

const getOtherDirection = (direction: Direction): Direction => {
    switch (direction) {
        case Direction.Forward:
            return Direction.Backward;
        case Direction.Backward:
            return Direction.Forward;
    }
};

export type StateType = Array<Array<Direction>>;
const initState = seq(INIT_ROWS).map(() => Array(INIT_TABLET_NUMBER).fill(Direction.Forward));
export default (state: StateType = initState, action: ActionType, {selection}: Context): StateType => {
    switch (action.type) {
        case SELECT_AND_TOGGLE_DIRECTION:
            return update(action.row, update(action.tablet, getOtherDirection))(state);
        case TOGGLE_DIRECTION:
            return update(selection.row, update(selection.tablet, getOtherDirection))(state);
        case SET_DIRECTION:
            return update(selection.row, update(selection.tablet, () => action.direction))(state);
        case ADD_TABLET_AFTER: {
            const tablet = action.tablet ?? selection.tablet;
            return state.map((row) => insert(row, tablet + 1, row[tablet]));
        }
        case ADD_TABLET_BEFORE: {
            const tablet = action.tablet ?? selection.tablet;
            return state.map((row) => insert(row, tablet, row[tablet]));
        }
        case REMOVE_TABLET:
            return state.map(remove(action.tablet ?? selection.tablet));
        case ADD_ROW_AFTER: {
            const row = action.row ?? selection.row;
            return insert(state, row + 1, state[row]);
        }
        case ADD_ROW_BEFORE: {
            const row = action.row ?? selection.row;
            return insert(state, row, state[row]);
        }
        case REMOVE_ROW:
            return remove(action.row ?? selection.row)(state);
        default:
            return state;
    }
};
