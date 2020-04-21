import {unsafeDeleteAt} from 'fp-ts/es6/Array';
import {map} from 'fp-ts/es6/Record';
import * as uuid from 'uuid';

import {Direction} from '~types';
import {insert} from '~utils/array';
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
import {initialTabletIds} from '../constants';
import {Context, RowId, TabletId} from '../types';
import {ActionType, SET_DIRECTION, TOGGLE_DIRECTION} from './actions';


type RowsState = Array<RowId>;
const initialRowIds: RowsState = [uuid.v4()] as RowId[];
const rows = (state = initialRowIds, action: ActionType, {selection}: Context): RowsState => {
    switch (action.type) {
        case ADD_ROW_AFTER: {
            const index = action.row !== undefined ? state.indexOf(action.row) : selection.row;
            return insert(state, index, action.newId);
        }
        case ADD_ROW_BEFORE: {
            const index = action.row !== undefined ? state.indexOf(action.row) : selection.row;
            return insert(state, index - 1, action.newId);
        }
        case REMOVE_ROW: {
            const index = action.row !== undefined ? state.indexOf(action.row) : selection.row;
            return unsafeDeleteAt(index, state);
        }
        case IMPORT_DESIGN:
            return action.rowIds;
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

type RowType = Record<TabletId, Direction>;
type DirectionsType = Record<RowId, RowType>;
const initState = fromEntries(initialRowIds.map((id) => [id, fromEntries(initialTabletIds.map((id) => [id, Direction.Forward]))]));
const directions = (state: DirectionsType = initState, action: ActionType, {selection, tablets, rows}: Context): DirectionsType => {
    switch (action.type) {
        case SELECT_AND_TOGGLE_DIRECTION:
            return record.update(action.row, record.update(action.tablet, getOtherDirection))(state);
        case TOGGLE_DIRECTION:
            return record.update(rows[selection.row], record.update(tablets[selection.tablet], getOtherDirection))(state);
        case SET_DIRECTION:
            return record.update(rows[selection.row], record.update(tablets[selection.tablet], () => action.direction))(state);
        case ADD_TABLET_AFTER:
        case ADD_TABLET_BEFORE: {
            const tablet = action.tablet ?? tablets[selection.tablet];
            return map((row: RowType) => record.update(action.newId, () => row[tablet])(row))(state);
        }
        case REMOVE_TABLET: {
            const tablet = action.tablet ?? tablets[selection.tablet];
            return map((row: RowType) => record.remove(tablet)(row))(state);
        }
        case ADD_ROW_BEFORE:
        case ADD_ROW_AFTER: {
            const row = action.row ?? rows[selection.row];
            return record.update(action.newId, () => state[row])(state);
        }
        case REMOVE_ROW:
            return record.remove(action.row ?? rows[selection.row])(state);
        case IMPORT_DESIGN:
            return {} as DirectionsType; // FIXME
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
