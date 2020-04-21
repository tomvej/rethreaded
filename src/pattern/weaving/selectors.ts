import {map, reduce} from 'fp-ts/es6/Array';
import {pipe} from 'fp-ts/es6/pipeable';
import {createSelector, createStructuredSelector} from 'reselect';

import * as focus from '~core/focus';
import {RootState} from '~reducer';
import {Color, Direction, Hole, Tablet} from '~types';
import {seq} from '~utils/array';
import {fromEntries} from '~utils/record';

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
export const getRowNumberFromModel = (model: StateType): number => model.directions.length;
export const getRowNumber = (state: RootState): number => getRowNumberFromModel(getState(state));
export const getRowsFromModel = (model: StateType): Array<RowId> => model.rows;
export const getRows = (state: RootState): Array<RowId> => getRowsFromModel(getState(state));
export const isWeavingSelected = (state: RootState, tablet: TabletId, row: number): boolean => isTabletSelected(state, tablet) && getSelectedRow(state) === row;

const createGetColor = (tablet: TabletId, hole: Hole) => (state: RootState): Color => getColor(state, tablet, hole);
type GetTabletColors = (state: RootState) => Tablet<Color>;
const createGetTabletColors = (tablet: TabletId): GetTabletColors => createSelector(
    createGetColor(tablet, Hole.A),
    createGetColor(tablet, Hole.B),
    createGetColor(tablet, Hole.C),
    createGetColor(tablet, Hole.D),
    (colorA, colorB, colorC, colorD) => [colorA, colorB, colorC, colorD],
);

type GetTabletDirectionsType = (state: RootState) => (state: RootState) => Array<Direction>;
const createGetTabletDirectionsSelector = (tablet: TabletId): GetTabletDirectionsType => createSelector(
    getRowNumber,
    (rows) => createSelector(
        seq(rows).map((row) => (state: RootState): Direction => getDirection(state, row, tablet)),
        (...directions) => directions,
    ),
);
const createGetTabletDirections = (tablet: TabletId): (state: RootState) => Array<Direction> => {
    const getTabletDirectionsSelector = createGetTabletDirectionsSelector(tablet);
    return (state: RootState): Array<Direction> => getTabletDirectionsSelector(state)(state);
}

type GetTabletPattern = (state: RootState) => Array<Color>;
const createGetTabletPattern = (tablet: TabletId): GetTabletPattern => {
    const getTabletDirections = createGetTabletDirections(tablet);
    const getTabletColors = createGetTabletColors(tablet);
    return createSelector(
        getTabletDirections,
        getTabletColors,
        computePattern,
    );
};

type GetTabletPatternTable = (state: RootState) => (state: RootState) => Record<TabletId, Array<Color>>;
const getTabletPatternTable: GetTabletPatternTable = createSelector(
    getTablets,
    (tablets) => createStructuredSelector(
        fromEntries(tablets.map((id) => [id, createGetTabletPattern(id)])),
    ),
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
        (directions): number => pipe(
            directions,
            map(getDirectionTwist),
            reduce(0, (a, b) => a + b),
        )
    ),
);
type GetTabletTwist = (state: RootState, tablet: TabletId) => number;
export const createGetTabletTwist = (): GetTabletTwist => {
    const getTabletTwistSelector = createGetTabletTwistSelector();
    return (state: RootState, tablet: TabletId): number => getTabletTwistSelector(state, tablet)(state);
}

type ExportWeaving = (state: RootState) => Array<Array<Direction>>;
export const exportWeaving: ExportWeaving = (state: RootState) => getState(state).directions.map((row) => getTablets(state).map((tablet) => row[tablet]));
