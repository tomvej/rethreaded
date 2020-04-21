import {RootState} from '~reducer';
import {Hole} from '~types';

import {getState as getParentState} from '../selectors';
import {SelectionState} from '../types';
import {NAME} from './constants';

const getState = (state: RootState): SelectionState => getParentState(state)[NAME];

export const getSelectedThread = (state: RootState): number => getState(state).thread;

export const isThreadingSelected = (state: RootState, tablet: number, hole: Hole): boolean => getState(state).hole === hole && getState(state).tablet === tablet;

export const isWeavingSelected = (state: RootState, tablet: number, row: number): boolean => getState(state).row === row && getState(state).tablet === tablet;
