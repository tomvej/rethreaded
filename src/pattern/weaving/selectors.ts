import {flow} from 'fp-ts/es6/function';
import {pipe} from 'fp-ts/es6/pipeable';
import {createSelector, createStructuredSelector} from 'reselect';

import * as focus from '~core/focus';
import * as array from '~func/array';
import * as record from '~func/record';
import {RootState} from '~reducer';
import {Color, Direction, Hole, Tablet} from '~types';

import {getSelectedRow} from '../selection';
import {getModel as getParentState} from '../selectors';
import {getColor, getTablets, isTabletSelected} from '../threading';
import {RowId, TabletId} from '../types';
import computePattern from './computePattern';
import {NAME} from './constants';
import {StateType} from './reducer';

const getState = (state: RootState): StateType => getParentState(state)[NAME];

export const isFocused = (state: RootState): boolean => focus.isFocused(state, NAME);
export const getDirection = (state: RootState, row: RowId, tablet: TabletId): Direction => getState(state).directions[row][tablet];
export const getRowsFromModel = (model: StateType): Array<RowId> => model.rows;
export const getRows = (state: RootState): Array<RowId> => getRowsFromModel(getState(state));
export const getRowNumber = (state: RootState): number => getRows(state).length;
const isRowSelected = (state: RootState, row: RowId): boolean => getRows(state)[getSelectedRow(state)] === row;
export const isWeavingSelected = (state: RootState, tablet: TabletId, row: RowId): boolean => isTabletSelected(state, tablet) && isRowSelected(state, row);

type GetRowOrder = (state: RootState, row: RowId) => number;
export const createGetRowOrder = (): GetRowOrder => createSelector(
    getRows,
    (state: RootState, row: RowId) => row,
    (rows, row) => rows.indexOf(row),
);

const getPreviousRowTable = createSelector(
    getRows,
    (rows) => pipe(
        array.zip(rows, array.rotate(1)(rows)),
        record.getFromEntries(),
    ),
);
export const getPreviousRow = (state: RootState, row: RowId): RowId => getPreviousRowTable(state)[row];

const createGetColor = (tablet: TabletId, hole: Hole) => (state: RootState): Color => getColor(state, tablet, hole);
type GetTabletColors = (state: RootState) => Tablet<Color>;
const createGetTabletColors = (tablet: TabletId): GetTabletColors => createSelector(
    createGetColor(tablet, Hole.A),
    createGetColor(tablet, Hole.B),
    createGetColor(tablet, Hole.C),
    createGetColor(tablet, Hole.D),
    (colorA, colorB, colorC, colorD) => [colorA, colorB, colorC, colorD],
);

type GetDirection = (state: RootState) => Direction;
const createGetDirection = (row: RowId, tablet: TabletId) => (state: RootState): Direction => getDirection(state, row, tablet);
type GetTabletDirectionsType = (state: RootState) => (state: RootState) => Record<RowId, Direction>;
const createGetTabletDirectionsSelector = (tablet: TabletId): GetTabletDirectionsType => createSelector(
    getRows,
    (rows) => createStructuredSelector(pipe(
        rows,
        array.addValues((row) => createGetDirection(row, tablet)),
        record.getFromEntries(),
    )),
);
const createGetTabletDirections = (tablet: TabletId): (state: RootState) => Record<RowId, Direction> => {
    const getTabletDirectionsSelector = createGetTabletDirectionsSelector(tablet);
    return (state): Record<RowId, Direction> => getTabletDirectionsSelector(state)(state);
}

type GetTabletPattern = (state: RootState) => Record<RowId, Color>;
const createGetTabletPattern = (tablet: TabletId): GetTabletPattern => {
    const getTabletDirections = createGetTabletDirections(tablet);
    const getTabletColors = createGetTabletColors(tablet);
    return createSelector(
        getTabletDirections,
        getTabletColors,
        getRows,
        computePattern,
    );
};

type GetTabletPatternTable = (state: RootState) => (state: RootState) => Record<TabletId, Record<RowId, Color>>;
const getTabletPatternTable: GetTabletPatternTable = createSelector(
    getTablets,
    (tablets) => createStructuredSelector(pipe(
        tablets,
        array.addValues(createGetTabletPattern),
        record.getFromEntries(),
    )),
);

export const getPatternColor = (state: RootState, tablet: TabletId, row: RowId): Color => getTabletPatternTable(state)(state)[tablet][row];

const getDirectionTwist = (direction: Direction): number => {
    switch (direction) {
        case Direction.Forward:
            return 1;
        case Direction.Backward:
            return -1;
    }
}
type GetTabletTwistSelector = (state: RootState, tablet: TabletId) => (state: RootState) => number;
const createGetTabletTwistSelector = (): GetTabletTwistSelector => createSelector(
    (state: unknown, tablet: TabletId) => tablet,
    (tablet) => createSelector(
        createGetTabletDirections(tablet),
        flow(
            record.map(getDirectionTwist),
            record.reduce(0, (a, b) => a + b),
        ),
    ),
);
type GetTabletTwist = (state: RootState, tablet: TabletId) => number;
export const createGetTabletTwist = (): GetTabletTwist => {
    const getTabletTwistSelector = createGetTabletTwistSelector();
    return (state: RootState, tablet: TabletId): number => getTabletTwistSelector(state, tablet)(state);
}

type ExportWeaving = (state: RootState) => Array<Array<Direction>>;
export const exportWeaving: ExportWeaving = (state: RootState) => getRows(state).map((row) => getTablets(state).map((tablet) => getDirection(state, row, tablet)));
