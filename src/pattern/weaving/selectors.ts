import {createSelector} from 'reselect';

import * as focus from '~core/focus';
import {RootState} from '~reducer';
import {Color, Direction, Hole, Tablet} from '~types';
import {seq} from '~utils/array';

import {getModel as getParentModel} from '../selectors';
import {getColor} from '../threading';
import computePattern from './computePattern';
import {NAME} from './constants';
import {StateType} from './reducer';

const getModel = (state: RootState): StateType => getParentModel(state)[NAME];

export const isFocused = (state: RootState): boolean => focus.isFocused(state, NAME);
export const getDirection = (state: RootState, row: number, tablet: number): Direction => getModel(state)[row][tablet];
export const getTabletNumber = (state: RootState): number => getModel(state)[0].length;
export const getRowNumberFromModel = (model: StateType): number => model.length;
export const getRowNumber = (state: RootState): number => getRowNumberFromModel(getModel(state));

const createGetColor = (tablet: number, hole: Hole) => (state: RootState): Color => getColor(state, tablet, hole);
type GetTabletColorsType = (state: RootState) => Tablet<Color>;
const createGetTabletColors = (tablet: number): GetTabletColorsType => createSelector(
    createGetColor(tablet, Hole.A),
    createGetColor(tablet, Hole.B),
    createGetColor(tablet, Hole.C),
    createGetColor(tablet, Hole.D),
    (colorA, colorB, colorC, colorD) => [colorA, colorB, colorC, colorD],
);

type GetTabletDirectionsType = (state: RootState) => (state: RootState) => Array<Direction>;
const createGetTabletDirections = (tablet: number): GetTabletDirectionsType => createSelector(
    getRowNumber,
    (rows) => createSelector(
        seq(rows).map((row) => (state: RootState): Direction => getDirection(state, row, tablet)),
        (...directions) => directions,
    ),
);

type GetTabletPatternType = (state: RootState) => Array<Color>;
const createGetTabletPattern = (tablet: number): GetTabletPatternType => {
    const getTabletDirectionsSelector = createGetTabletDirections(tablet);
    const getTabletDirections = (state: RootState): Array<Direction> => getTabletDirectionsSelector(state)(state);
    const getTabletColors = createGetTabletColors(tablet);
    return createSelector(
        getTabletDirections,
        getTabletColors,
        computePattern,
    );
};

type GetTabletPatternTableType = (state: RootState) => (state: RootState) => Array<Array<Color>>;
const getTabletPatternTable: GetTabletPatternTableType = createSelector(
    getTabletNumber,
    (tablets) => createSelector(
        seq(tablets).map(createGetTabletPattern),
        (...getPatterns) => getPatterns,
    ),
);

export const getPatternColor = (state: RootState, tablet: number, row: number): Color => getTabletPatternTable(state)(state)[tablet][row];
