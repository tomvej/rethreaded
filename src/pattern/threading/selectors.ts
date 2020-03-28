import * as focus from '~core/focus';
import {RootState} from '~reducer';
import {Color, Hole, ThreadingType} from '~types';

import {getState as getParentState} from '../selectors';
import {getColor as getThreadColor} from '../threads';
import {NAME} from './constants';
import {StateType} from './reducer';

const getState = (state: RootState): StateType => getParentState(state)[NAME];

export const getTabletNumberFromModel = (state: StateType): number => state.threading.length;
export const getTabletNumber = (state: RootState): number => getTabletNumberFromModel(getState(state));

export const getThreading = (state: RootState, tablet: number): ThreadingType => getState(state).threading[tablet];

const getThread = (state: RootState, tablet: number, hole: Hole): number => getState(state).threads[tablet][hole];

export const getColor = (state: RootState, tablet: number, hole: Hole): Color => getThreadColor(state, getThread(state, tablet, hole));

export const isFocused = (state: RootState): boolean => focus.isFocused(state, NAME);
