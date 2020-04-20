import * as focus from '~core/focus';
import {RootState} from '~reducer';
import {Color, Hole, Tablet, ThreadingType} from '~types';

import {getModel as getParentState} from '../selectors';
import {getColor as getThreadColor} from '../threads';
import {TabletId, ThreadId} from '../types';
import {NAME} from './constants';
import {StateType} from './reducer';

const getState = (state: RootState): StateType => getParentState(state)[NAME];

export const getTabletNumberFromModel = (state: StateType): number => state.threading.length;
export const getTabletNumber = (state: RootState): number => getTabletNumberFromModel(getState(state));

export const getThreading = (state: RootState, tablet: TabletId): ThreadingType => getState(state).threading[tablet];

const getThread = (state: RootState, tablet: TabletId, hole: Hole): number => getState(state).threads[tablet][hole];

export const getColor = (state: RootState, tablet: TabletId, hole: Hole): Color => getThreadColor(state, getThread(state, tablet, hole));

export const isFocused = (state: RootState): boolean => focus.isFocused(state, NAME);

type ExportThreading = (state: RootState) => {
    threading: Array<ThreadingType>;
    threads: Array<Tablet<ThreadId>>;
}
export const exportThreading: ExportThreading = getState;
