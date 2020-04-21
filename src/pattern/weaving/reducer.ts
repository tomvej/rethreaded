import {array, map} from 'fp-ts/es6/Array';
import {pipe} from 'fp-ts/es6/pipeable';
import {fromFoldable} from 'fp-ts/es6/Record';
import {getLastSemigroup} from 'fp-ts/es6/Semigroup';

import {Direction} from '~types';
import {insert, remove, seq, update} from '~utils/array';
import {addIndices} from '~utils/func';
import * as record from '~utils/record';
import {fromEntries} from '~utils/record';

import {
    ADD_ROW_AFTER,
    ADD_ROW_BEFORE,
    ADD_TABLET_AFTER,
    ADD_TABLET_BEFORE,
    CLEAR,
    IMPORT_DESIGN,
    REMOVE_ROW,
    REMOVE_TABLET,
    SELECT_AND_TOGGLE_DIRECTION,
} from '../actions';
import {initialTabletIds, MIN_ROWS} from '../constants';
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
const initState = seq(MIN_ROWS).map(() => fromEntries(initialTabletIds.map((id) => [id, Direction.Forward])));
export default (state: StateType = initState, action: ActionType, {selection, tablets}: Context): StateType => {
    switch (action.type) {
        case SELECT_AND_TOGGLE_DIRECTION:
            return update(action.row, record.update(action.tablet, getOtherDirection))(state);
        case TOGGLE_DIRECTION:
            return update(selection.row, record.update(tablets[selection.tablet], getOtherDirection))(state);
        case SET_DIRECTION:
            return update(selection.row, record.update(tablets[selection.tablet], () => action.direction))(state);
        case ADD_TABLET_AFTER: {
            const tablet = action.tablet ?? tablets[selection.tablet];
            return state.map((row) => record.update(action.newId, () => row[tablet])(row));
        }
        case ADD_TABLET_BEFORE: {
            const tablet = action.tablet ?? tablets[selection.tablet];
            return state.map((row) => record.update(action.newId, () => row[tablet])(row));
        }
        case REMOVE_TABLET:
            return state.map(record.remove(action.tablet ?? tablets[selection.tablet]));
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
            return pipe(
                action.data.weaving,
                map(addIndices((i) => action.tabletIds[i])),
                map(fromFoldable(getLastSemigroup<Direction>(), array)),
            );
        case CLEAR:
            return initState;
        default:
            return state;
    }
};
