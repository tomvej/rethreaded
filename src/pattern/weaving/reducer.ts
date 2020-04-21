import {array, init, map, snoc} from 'fp-ts/es6/Array';
import {getOrElse} from 'fp-ts/es6/Option';
import {pipe} from 'fp-ts/es6/pipeable';
import {fromFoldable, map as mapRecord} from 'fp-ts/es6/Record';
import {getLastSemigroup} from 'fp-ts/es6/Semigroup';

import {Direction} from '~types';
import {seq} from '~utils/array';
import {addIndices} from '~utils/func';
import * as record from '~utils/record';
import {fromEntries} from '~utils/record';
import {combineContextReducers} from '~utils/redux';

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
import {Context, RowId, TabletId} from '../types';
import {ActionType, SET_DIRECTION, TOGGLE_DIRECTION} from './actions';


type RowsState = Array<RowId>;
const initialRowIds: RowsState = seq(MIN_ROWS);
const rows = (state = initialRowIds, action: ActionType): RowsState => {
    switch (action.type) {
        case ADD_ROW_AFTER:
        case ADD_ROW_BEFORE:
            return snoc(state, state.length);
        case REMOVE_ROW:
            return getOrElse(() => [] as RowsState)(init(state));
        case IMPORT_DESIGN:
            return seq(action.data.weaving.length);
        case CLEAR:
            return initialRowIds;
        default:
            return state;
    }
}

const getOtherDirection = (direction: Direction): Direction => {
    switch (direction) {
        case Direction.Forward:
            return Direction.Backward;
        case Direction.Backward:
            return Direction.Forward;
    }
};

type DirectionsType = Record<RowId, Record<TabletId, Direction>>;
const initState = fromEntries(initialRowIds.map((id) => [id, fromEntries(initialTabletIds.map((id) => [id, Direction.Forward]))]));
const directions = (state: DirectionsType = initState, action: ActionType, {selection, tablets}: Context): DirectionsType => {
    switch (action.type) {
        case SELECT_AND_TOGGLE_DIRECTION:
            return record.update(action.row, record.update(action.tablet, getOtherDirection))(state);
        case TOGGLE_DIRECTION:
            return record.update(selection.row, record.update(tablets[selection.tablet], getOtherDirection))(state);
        case SET_DIRECTION:
            return record.update(selection.row, record.update(tablets[selection.tablet], () => action.direction))(state);
        case ADD_TABLET_AFTER: {
            const tablet = action.tablet ?? tablets[selection.tablet];
            return state;
            // FIXME return state.map((row) => record.update(action.newId, () => row[tablet])(row));
        }
        case ADD_TABLET_BEFORE: {
            const tablet = action.tablet ?? tablets[selection.tablet];
            return state
            // FIXME return state.map((row) => record.update(action.newId, () => row[tablet])(row));
        }
        case REMOVE_TABLET:
            return state;
            //FIXME return state.map(record.remove(action.tablet ?? tablets[selection.tablet]));
        case ADD_ROW_AFTER: {
            const row = action.row ?? selection.row;
            return record.update(row + 1, () => state[row])(state);
        }
        case ADD_ROW_BEFORE: {
            const row = action.row ?? selection.row;
            return record.update(row, () => state[row])(state);
        }
        case REMOVE_ROW:
            return record.remove(action.row ?? selection.row)(state);
        case IMPORT_DESIGN:
            return []; // FIXME
            /*return pipe(
                action.data.weaving,
                map(addIndices((i) => action.tabletIds[i])),
                map(fromFoldable(getLastSemigroup<Direction>(), array)),
            );*/
        case CLEAR:
            return initState;
        default:
            return state;
    }
};

const reducer = combineContextReducers({directions, rows});
export type StateType = ReturnType<typeof reducer>;
export default reducer;
