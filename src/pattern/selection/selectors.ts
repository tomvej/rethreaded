import {RootState} from '~reducer';
import {Hole} from '~types';

import {getState as getParentState} from '../selectors';
import {SelectionState} from '../types';
import {NAME} from './constants';

const getState = (state: RootState): SelectionState => getParentState(state)[NAME];

export const getSelectedThread = (state: RootState): number => getState(state).thread;
export const getSelectedTablet = (state: RootState): number => getState(state).tablet;
export const getSelectedHole = (state: RootState): Hole => getState(state).hole;
export const getSelectedRow = (state: RootState): number => getState(state).row;
