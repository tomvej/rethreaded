import * as focus from '~core/focus';
import {RootState} from '~reducer';
import {Color} from '~types';

import {getSelectedThread} from '../selection';
import {getState as getParentState} from '../selectors';
import {NAME} from './constants';
import {StateType} from './reducer';

const getState = (state: RootState): StateType => getParentState(state)[NAME];

export const isFocused = (state: RootState): boolean => focus.isFocused(state, NAME);

export const getThreadNumberFromModel = (state: StateType) => state.colors.length;
export const getThreadNumber = (state: RootState): number => getThreadNumberFromModel(getState(state));

export const getColor = (state: RootState, thread: number): Color => getState(state).colors[thread];

export const isPickerVisible = (state: RootState): boolean => getState(state).pickerVisible;

export const getCurrentColor = (state: RootState): Color => getColor(state, getSelectedThread(state));
