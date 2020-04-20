import * as focus from '~core/focus';
import {RootState} from '~reducer';
import {Color} from '~types';

import {getSelectedThread} from '../selection';
import {getModel as getParentModel, getState as getParentState} from '../selectors';
import {ThreadId} from '../types';
import {NAME} from './constants';
import {ModelType} from './reducer';

const getModel = (state: RootState): ModelType => getParentModel(state)[NAME];
const getState = (state: RootState): boolean => getParentState(state)[NAME];

export const isFocused = (state: RootState): boolean => focus.isFocused(state, NAME);

export const getThreadNumberFromModel = (state: ModelType): number => state.threads.length;
export const getThreadNumber = (state: RootState): number => getThreadNumberFromModel(getModel(state));

export const getThreads = (state: RootState): Array<ThreadId> => getModel(state).threads;
export const getColor = (state: RootState, thread: ThreadId): Color => getModel(state).colors[thread];

export const isPickerVisible = (state: RootState): boolean => getState(state);

export const getCurrentColor = (state: RootState): Color => getColor(state, getSelectedThread(state));

type ExportThreads = (state: RootState) => Array<Color>;
export const exportThreads: ExportThreads = (state) => getModel(state).colors;
