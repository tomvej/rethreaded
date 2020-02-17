import {RootState} from '~reducer';
import {ThreadingType} from '~types';

import {getModel as getParentModel} from '../selectors';
import {NAME} from './constants';
import {StateType} from './reducer';

const getModel = (state: RootState): StateType => getParentModel(state)[NAME];

export const getTabletNumber = (state: RootState): number => getModel(state).threading.length;

export const getThreading = (state: RootState, number: number): ThreadingType => getModel(state).threading[number];
