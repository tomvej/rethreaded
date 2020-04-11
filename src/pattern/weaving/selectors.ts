import {pipe} from 'fp-ts/es6/pipeable';
import {map, reduce} from 'fp-ts/es6/Array';
import {createSelector} from 'reselect';

import * as focus from '~core/focus';
import {RootState} from '~reducer';
import {Color, Direction, Hole, Tablet} from '~types';
import {seq} from '~utils/array';

import {getModel as getParentState} from '../selectors';
import {getColor} from '../threading';
import computePattern from './computePattern';
import {NAME} from './constants';
import {StateType} from './reducer';

const getState = (state: RootState): StateType => getParentState(state)[NAME];

export const isFocused = (state: RootState): boolean => focus.isFocused(state, NAME);
export const getDirection = (state: RootState, row: number, tablet: number): Direction => getState(state)[row][tablet];
export const getTabletNumber = (state: RootState): number => getState(state)[0].length;
export const getRowNumberFromModel = (model: StateType): number => model.length;
export const getRowNumber = (state: RootState): number => getRowNumberFromModel(getState(state));

const createGetColor = (tablet: number, hole: Hole) => (state: RootState): Color => getColor(state, tablet, hole);
type GetTabletColors = (state: RootState) => Tablet<Color>;
const createGetTabletColors = (tablet: number): GetTabletColors => createSelector(
    createGetColor(tablet, Hole.A),
    createGetColor(tablet, Hole.B),
    createGetColor(tablet, Hole.C),
    createGetColor(tablet, Hole.D),
    (colorA, colorB, colorC, colorD) => [colorA, colorB, colorC, colorD],
);

type GetTabletDirectionsType = (state: RootState) => (state: RootState) => Array<Direction>;
const createGetTabletDirectionsSelector = (tablet: number): GetTabletDirectionsType => createSelector(
    getRowNumber,
    (rows) => createSelector(
        seq(rows).map((row) => (state: RootState): Direction => getDirection(state, row, tablet)),
        (...directions) => directions,
    ),
);
const createGetTabletDirections = (tablet: number): (state: RootState) => Array<Direction> => {
    const getTabletDirectionsSelector = createGetTabletDirectionsSelector(tablet);
    return (state: RootState): Array<Direction> => getTabletDirectionsSelector(state)(state);
}

type GetTabletPattern = (state: RootState) => Array<Color>;
const createGetTabletPattern = (tablet: number): GetTabletPattern => {
    const getTabletDirections = createGetTabletDirections(tablet);
    const getTabletColors = createGetTabletColors(tablet);
    return createSelector(
        getTabletDirections,
        getTabletColors,
        computePattern,
    );
};

type GetTabletPatternTable = (state: RootState) => (state: RootState) => Array<Array<Color>>;
const getTabletPatternTable: GetTabletPatternTable = createSelector(
    getTabletNumber,
    (tablets) => createSelector(
        seq(tablets).map(createGetTabletPattern),
        (...getPatterns) => getPatterns,
    ),
);

export const getPatternColor = (state: RootState, tablet: number, row: number): Color => getTabletPatternTable(state)(state)[tablet][row];

const getDirectionTwist = (direction: Direction): number => {
    switch (direction) {
        case Direction.Forward:
            return 1;
        case Direction.Backward:
            return -1;
    }
}
type GetTabletTwistSelector = (state: RootState, tablet: number) => (state: RootState) => number;
const createGetTabletTwistSelector = (): GetTabletTwistSelector => createSelector(
    (state: unknown, tablet: number) => tablet,
    (tablet) => createSelector(
        createGetTabletDirections(tablet),
        (directions): number => pipe(
            directions,
            map(getDirectionTwist),
            reduce(0, (a, b) => a + b),
        )
    ),
);
type GetTabletTwist = (state: RootState, tablet: number) => number;
export const createGetTabletTwist = (): GetTabletTwist => {
    const getTabletTwistSelector = createGetTabletTwistSelector();
    return (state: RootState, tablet: number): number => getTabletTwistSelector(state, tablet)(state);
}

type ExportWeaving = (state: RootState) => Array<Array<Direction>>;
export const exportWeaving: ExportWeaving = getState;
