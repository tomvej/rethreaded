import {RootState} from '~reducer';

import {NAME} from './constants';
import {PatternState} from './reducer';

export const getModel = (state: RootState): PatternState => state[NAME];
