import * as focus from '~core/focus';
import {RootState} from '~reducer';
import {Color} from '~types';

import {getModel as getParentModel} from '../selectors';
import {NAME} from './constants';
import {StateType} from './reducer';

const getModel = (state: RootState): StateType => getParentModel(state)[NAME];

export const isFocused = (state: RootState): boolean => focus.isFocused(state, NAME);

export const getThreadNumber = (state: RootState): number => getModel(state).colors.length;

export const getColor = (state: RootState, thread: number): Color => getModel(state).colors[thread];

export const getSelected = (state: RootState): number => getModel(state).selected;

export const isSelected = (state: RootState, thread: number): boolean => getSelected(state) === thread;
