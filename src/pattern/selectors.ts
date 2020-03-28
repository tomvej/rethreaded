import {getCurrent} from '~core/undo';
import {RootState} from '~reducer';

import {NAME} from './constants';
import {ModelType, StateType} from './reducer';

export const getState = (state: RootState): StateType => state[NAME];
export const getModel = (state: RootState): ModelType => getCurrent(getState(state).model);
