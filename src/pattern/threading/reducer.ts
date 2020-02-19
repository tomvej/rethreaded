import {Tablet, ThreadingType} from '~types';
import {update, updateTablet} from '~utils/func';

import {SelectionState} from '../types';
import {ActionType, APPLY_THREAD, SET_S_THREADING, SET_Z_THREADING} from './actions';

const TABLET_NUMBER = 8;

export type StateType = {
    threading: Array<ThreadingType>;
    threads: Array<Tablet<number>>;
}

const initialState: StateType = {
    threading: Array(TABLET_NUMBER).fill(ThreadingType.S),
    threads: Array.from({length: TABLET_NUMBER}).map(() => [0, 1, 2, 1]),
};

const reducer = (state: StateType = initialState, action: ActionType, selection: SelectionState): StateType => {
    switch (action.type) {
        case SET_S_THREADING:
            return update(state, 'threading',
                (threading) => update(threading, selection.tablet, () => ThreadingType.S),
            );
        case SET_Z_THREADING:
            return update(state, 'threading',
                (threading) => update(threading, selection.tablet, () => ThreadingType.Z),
            );
        case APPLY_THREAD:
            return update(state, 'threads',
                (threads) => update(threads, selection.tablet,
                    (tablet) => updateTablet(tablet, selection.hole, () => action.thread || selection.thread),
                ),
            );
        default:
            return state;
    }
};

export default reducer;
