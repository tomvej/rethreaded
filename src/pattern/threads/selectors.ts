import * as focus from '~core/focus';
import {RootState} from '~reducer';
import {Color} from '~types';

import {getSelectedThread} from '../selection';
import {getModel as getParentModel, getState as getParentState} from '../selectors';
import {NAME} from './constants';

const getModel = (state: RootState): Array<Color> => getParentModel(state)[NAME];
const getState = (state: RootState): boolean => getParentState(state)[NAME];

export const isFocused = (state: RootState): boolean => focus.isFocused(state, NAME);

export const getThreadNumberFromModel = (state: Array<Color>): number => state.length;
export const getThreadNumber = (state: RootState): number => getThreadNumberFromModel(getModel(state));

export const getColor = (state: RootState, thread: number): Color => getModel(state)[thread];

export const isPickerVisible = (state: RootState): boolean => getState(state);

export const getCurrentColor = (state: RootState): Color => getColor(state, getSelectedThread(state));

type ExportThreads = (state: RootState) => Array<Color>;
export const exportThreads: ExportThreads = getModel;
