import {RootState} from '~reducer';

import {NAME} from './constants';
import {StateType} from './reducer';

export const getState = (state: RootState): StateType => state[NAME];
