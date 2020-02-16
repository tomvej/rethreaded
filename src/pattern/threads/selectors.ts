import {getModel as getParentModel} from '../selectors';
import {RootState} from '~reducer';
import {ThreadsState} from './reducer';
import {NAME} from './constants';
import {Color} from '~types';

const getModel = (state: RootState): ThreadsState => getParentModel(state)[NAME];

export const getThreadNumber = (state: RootState): number => getModel(state).colors.length;

export const getColor = (state: RootState, thread: number): Color => getModel(state).colors[thread];

export const getSelected = (state: RootState): number => getModel(state).selected;
