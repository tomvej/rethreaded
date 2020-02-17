import {RootState} from '~reducer';
import {Color, Hole, ThreadingType} from '~types';

import {getModel as getParentModel} from '../selectors';
import {getColor as getThreadColor} from '../threads';
import {NAME} from './constants';
import {StateType} from './reducer';

const getModel = (state: RootState): StateType => getParentModel(state)[NAME];

export const getTabletNumber = (state: RootState): number => getModel(state).threading.length;

export const getThreading = (state: RootState, tablet: number): ThreadingType => getModel(state).threading[tablet];

const getThread = (state: RootState, tablet: number, hole: Hole): number => getModel(state).threads[tablet][hole];

export const getColor = (state: RootState, tablet: number, hole: Hole): Color => getThreadColor(state, getThread(state, tablet, hole));
