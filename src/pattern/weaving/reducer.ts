import {getOrElse} from 'fp-ts/es6/Option';
import {pipe} from 'fp-ts/es6/pipeable';
import {getLastSemigroup} from 'fp-ts/es6/Semigroup';

import * as array from '~func/array';
import * as record from '~func/record';
import {Direction} from '~types';
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
import {createIds} from '../utils';
import {ActionType, SET_DIRECTION, TOGGLE_DIRECTION} from './actions';


type RowsState = Array<RowId>;
const initialRowIds: RowsState = createIds(MIN_ROWS);
const rows = (state = initialRowIds, action: ActionType, {selection}: Context): RowsState => {
    switch (action.type) {
        case ADD_ROW_AFTER: {
            const index = action.row !== undefined ? state.indexOf(action.row) : selection.row;
            return pipe(
                state,
                array.insertAt(index + 1, action.newId),
                getOrElse(() => state),
            )
        }
        case ADD_ROW_BEFORE: {
            const index = action.row !== undefined ? state.indexOf(action.row) : selection.row;
            return pipe(
                state,
                array.insertAt(index + 1, action.newId),
                getOrElse(() => state),
            )
        }
        case REMOVE_ROW: {
            const index = action.row !== undefined ? state.indexOf(action.row) : selection.row;
            return pipe(
                state,
                array.deleteAt(index),
                getOrElse(() => state),
            );
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
const initialRow = pipe(
    initialTabletIds,
    array.addValues(() => Direction.Forward),
    record.getFromEntries(),
);
const initialState = pipe(
    initialRowIds,
    array.addValues(() => initialRow),
    record.getFromEntries(),
)
const directions = (state: DirectionsType = initialState, action: ActionType, {selection, tablets, rows}: Context): DirectionsType => {
    switch (action.type) {
        case SELECT_AND_TOGGLE_DIRECTION:
            return pipe(
                state,
                record.modifyAt(action.row, (row) => pipe(
                    row,
                    record.modifyAt(action.tablet, getOtherDirection),
                    getOrElse(() => row),
                )),
                getOrElse(() => state),
            );
        case TOGGLE_DIRECTION:
            return pipe(
                state,
                record.modifyAt(rows[selection.row], (row) => pipe(
                    row,
                    record.modifyAt(tablets[selection.tablet], getOtherDirection),
                    getOrElse(() => row),
                )),
                getOrElse(() => state),
            );
        case SET_DIRECTION:
            return pipe(
                state,
                record.modifyAt(rows[selection.row], (row) => pipe(
                    row,
                    record.updateAt(tablets[selection.tablet], action.direction),
                    getOrElse(() => row),
                )),
                getOrElse(() => state),
            )
        case ADD_TABLET_AFTER:
        case ADD_TABLET_BEFORE: {
            const tablet = action.tablet ?? tablets[selection.tablet];
            return pipe(
                state,
                record.map((row) => pipe(
                    row,
                    record.insertAt(action.newId, row[tablet]),
                )),
            );
        }
        case REMOVE_TABLET: {
            const tablet = action.tablet ?? tablets[selection.tablet];
            return pipe(
                state,
                record.map(record.deleteAt(tablet)),
            )
        }
        case ADD_ROW_BEFORE:
        case ADD_ROW_AFTER: {
            const row = action.row ?? rows[selection.row];
            return pipe(
                state,
                record.insertAt(action.newId, state[row]),
            );
        }
        case REMOVE_ROW:
            return pipe(
                state,
                record.deleteAt(action.row ?? rows[selection.row]),
            );
        case IMPORT_DESIGN:
            return pipe(
                action.data.weaving,
                array.map(array.addIndices((i) => action.tabletIds[i])),
                array.map(record.getFromEntries()),
                array.addIndices((i) => action.rowIds[i]),
                record.getFromEntries(),
            );
        case CLEAR:
            return initialState;
        default:
            return state;
    }
};

const reducer = combineContextReducers({directions, rows});
export type StateType = ReturnType<typeof reducer>;
export default reducer;
