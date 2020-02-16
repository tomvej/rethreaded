import {RootState} from '~reducer';
import {PatternState} from './reducer';
import {NAME} from './constants';

export const getModel = (state: RootState): PatternState => state[NAME];
