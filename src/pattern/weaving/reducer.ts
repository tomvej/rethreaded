import {Direction} from '~types';
import {insert, remove, seq, update} from '~utils/array';
import * as record from '~utils/record';

import {
    ADD_ROW_AFTER,
    ADD_ROW_BEFORE,
    ADD_TABLET_AFTER,
    ADD_TABLET_BEFORE, CLEAR,
    IMPORT_DESIGN,
    REMOVE_ROW,
    REMOVE_TABLET,
    SELECT_AND_TOGGLE_DIRECTION,
} from '../actions';
import {MIN_ROWS, MIN_TABLETS} from '../constants';
import {Context, TabletId} from '../types';
import {ActionType, SET_DIRECTION, TOGGLE_DIRECTION} from './actions';

const getOtherDirection = (direction: Direction): Direction => {
    switch (direction) {
        case Direction.Forward:
            return Direction.Backward;
        case Direction.Backward:
            return Direction.Forward;
    }
};

export type StateType = Array<Record<TabletId, Direction>>;
const initState = seq(MIN_ROWS).map(() => Array(MIN_TABLETS).fill(Direction.Forward));
export default (state: StateType = initState, action: ActionType, {selection}: Context): StateType => {
    switch (action.type) {
        case SELECT_AND_TOGGLE_DIRECTION:
            return update(action.row, record.update(action.tablet, getOtherDirection))(state);
        case TOGGLE_DIRECTION:
            return update(selection.row, record.update(selection.tablet, getOtherDirection))(state);
        case SET_DIRECTION:
            return update(selection.row, record.update(selection.tablet, () => action.direction))(state);
        case ADD_TABLET_AFTER: {
            const tablet = action.tablet ?? selection.tablet;
            return state.map((row) => record.update(tablet + 1, () => row[tablet])(row));
        }
        case ADD_TABLET_BEFORE: {
            const tablet = action.tablet ?? selection.tablet;
            return state.map((row) => record.update(tablet, () => row[tablet])(row));
        }
        case REMOVE_TABLET:
            return state.map(record.remove(action.tablet ?? selection.tablet));
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
        case IMPORT_DESIGN:
            return []; // FIXME
        case CLEAR:
            return initState;
        default:
            return state;
    }
};
