import {RootState} from '~reducer';
import {Hole} from '~types';

import {getState as getParentState} from '../selectors';
import {RowId, SelectionState, TabletId, ThreadId} from '../types';
import {NAME} from './constants';

const getState = (state: RootState): SelectionState => getParentState(state)[NAME];

export const getSelectedThread = (state: RootState) => getState(state).thread;

export const isThreadSelected = (state: RootState, thread: ThreadId) => getSelectedThread(state) === thread;

export const isThreadingSelected = (state: RootState, tablet: TabletId, hole: Hole) => getState(state).hole === hole && getState(state).tablet === tablet;

export const isWeavingSelected = (state: RootState, tablet: TabletId, row: RowId) => getState(state).row === row && getState(state).tablet === tablet;
