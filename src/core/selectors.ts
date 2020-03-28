import {RootState} from '~reducer';

import {NAME} from './constants';
import {CoreState} from './reducer';

export const getState = (state: RootState): CoreState => state[NAME];
