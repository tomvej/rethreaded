import {RootState} from '~reducer';
import {Hole} from '~types';

import {getModel as getParentModel} from '../selectors';
import {SelectionState} from '../types';
import {NAME} from './constants';

const getModel = (state: RootState): SelectionState => getParentModel(state)[NAME];

export const getSelectedThread = (state: RootState) => getModel(state).thread;

export const isThreadSelected = (state: RootState, thread: number) => getSelectedThread(state) === thread;

export const isThreadingSelected = (state: RootState, tablet: number, hole: Hole) => getModel(state).hole === hole && getModel(state).tablet === tablet;
