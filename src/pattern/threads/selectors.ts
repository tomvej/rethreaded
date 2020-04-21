import {map} from 'fp-ts/es6/Array';
import {pipe} from 'fp-ts/es6/pipeable';
import {createSelector} from 'reselect';

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

export const getThreadsFromModel = (state: ModelType): Array<ThreadId> => state.threads;
export const getThreads = (state: RootState): Array<ThreadId> => getThreadsFromModel(getModel(state));

export const isThreadSelected = (state: RootState, thread: ThreadId): boolean => getThreads(state)[getSelectedThread(state)] === thread;

export const getColor = (state: RootState, thread: ThreadId): Color => getModel(state).colors[thread];

export const isPickerVisible = (state: RootState): boolean => getState(state);

export const getCurrentColor = (state: RootState): Color => getColor(state, getThreads(state)[getSelectedThread(state)]);

type GetThreadOrder = (state: RootState, thread: ThreadId) => number;
export const createGetThreadOrder = (): GetThreadOrder => createSelector(
    getThreads,
    (state: RootState, thread: ThreadId) => thread,
    (threads, thread) => threads.indexOf(thread),
);

type ExportThreads = (state: RootState) => Array<Color>;
export const exportThreads: ExportThreads = (state) => pipe(
    getThreads(state),
    map((id) => getColor(state, id)),
);
