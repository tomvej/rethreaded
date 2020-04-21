import {pipe} from 'fp-ts/es6/pipeable';
import {createSelector} from 'reselect';

import * as focus from '~core/focus';
import {RootState} from '~reducer';
import {Color, Hole, Tablet, ThreadingType} from '~types';
import {map as mapTablet} from '~utils/tablet';

import {getSelectedHole, getSelectedTablet} from '../selection';
import {getModel as getParentState} from '../selectors';
import {getColor as getThreadColor, getThreads} from '../threads';
import {TabletId, ThreadId} from '../types';
import {NAME} from './constants';
import {StateType} from './reducer';

const getState = (state: RootState): StateType => getParentState(state)[NAME];

export const getTabletNumber = (state: RootState): number => getState(state).tablets.length;
export const getTabletsFromModel = (state: StateType): Array<TabletId> => state.tablets;
export const getTablets = (state: RootState): Array<TabletId> => getTabletsFromModel(getState(state));

export const getThreading = (state: RootState, tablet: TabletId): ThreadingType => getState(state).threading[tablet];

const getThread = (state: RootState, tablet: TabletId, hole: Hole): ThreadId => getState(state).threads[tablet][hole];

export const getColor = (state: RootState, tablet: TabletId, hole: Hole): Color => getThreadColor(state, getThread(state, tablet, hole));

export const isFocused = (state: RootState): boolean => focus.isFocused(state, NAME);
export const isTabletSelected = (state: RootState, tablet: TabletId): boolean => getTablets(state)[getSelectedTablet(state)] === tablet;
export const isThreadingSelected = (state: RootState, tablet: TabletId, hole: Hole): boolean => isTabletSelected(state, tablet) && hole === getSelectedHole(state);

type GetTabletOrder = (state: RootState, tablet: TabletId) => number;
export const createGetTabletOrder = (): GetTabletOrder => createSelector(
    getTablets,
    (_: RootState, tablet: TabletId) => tablet,
    (tablets, tablet) => tablets.indexOf(tablet),
);

type ExportThreading = (state: RootState) => {
    threading: Array<ThreadingType>;
    threads: Array<Tablet<number>>;
}
export const exportThreading: ExportThreading = (state) => ({
    threading: getTablets(state).map((tablet) => getThreading(state, tablet)),
    threads: getTablets(state).map((tablet) => pipe(
        getState(state).threads[tablet],
        mapTablet((thread) => getThreads(state).indexOf(thread)),
    )),
});

