import {RootState} from '~reducer';

import {NAME} from './constants';
import {StateType} from './reducer';

export const getModel = (state: RootState): StateType => state[NAME];
