import {RootState} from '~reducer';
import {Direction} from '~types';

import {getModel as getParentModel} from '../selectors';
import {NAME} from './constants';
import {StateType} from './reducer';

const getModel = (state: RootState): StateType => getParentModel(state)[NAME];

export const getDirection = (state: RootState, row: number, tablet: number): Direction => getModel(state)[row][tablet];

export const getTabletNumber = (state: RootState): number => getModel(state)[0].length;

export const getRowNumber = (state: RootState): number => getModel(state).length;

