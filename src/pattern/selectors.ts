import * as undo from '~core/undo';
import {RootState} from '~reducer';

import {NAME} from './constants';
import {ModelType, StateType} from './reducer';

export const getState = (state: RootState): StateType => state[NAME];
export const getModel = (state: RootState): ModelType => undo.getCurrent(getState(state).model);
export const canUndo = (state: RootState): boolean => undo.canUndo(getState(state).model);
export const canRedo = (state: RootState): boolean => undo.canRedo(getState(state).model);
