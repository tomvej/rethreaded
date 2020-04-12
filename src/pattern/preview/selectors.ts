import {RootState} from '~reducer';

import {getState as getParentState} from '../selectors';
import {NAME} from './constants';
import {StateType} from './reducer';

const getState = (state: RootState): StateType => getParentState(state)[NAME];

export const getNumberOfRepeats = getState;
export const doesRepeat = (state: RootState): boolean => getNumberOfRepeats(state) > 1;
