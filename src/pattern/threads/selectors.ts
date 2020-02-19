import * as focus from '~core/focus';
import {RootState} from '~reducer';
import {Color} from '~types';

import {getModel as getParentModel} from '../selectors';
import {NAME} from './constants';
import {StateType} from './reducer';

const getModel = (state: RootState): StateType => getParentModel(state).base[NAME];

export const isFocused = (state: RootState): boolean => focus.isFocused(state, NAME);

export const getThreadNumber = (state: RootState): number => getModel(state).colors.length;

export const getColor = (state: RootState, thread: number): Color => getModel(state).colors[thread];

export const isSelected = (state: RootState, thread: number): boolean => getModel(state).selected === thread;
