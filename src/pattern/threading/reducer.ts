import {Hole, Tablet, ThreadingType} from '~types';
import {update, updateTablet} from '~utils/func';

import {
    ActionType,
    SELECT_NEXT_HOLE,
    SELECT_NEXT_TABLET,
    SELECT_PREV_HOLE,
    SELECT_PREV_TABLET,
    SELECT_THREAD,
    SET_S_THREADING,
    SET_Z_THREADING,
} from './actions';

const TABLET_NUMBER = 8;

export type StateType = {
    threading: Array<ThreadingType>;
    threads: Array<Tablet<number>>;
    selectedTablet: number;
    selectedHole: Hole;
}

const initialState: StateType = {
    threading: Array(TABLET_NUMBER).fill(ThreadingType.S),
    threads: Array.from({length: TABLET_NUMBER}).map(() => [0, 1, 2, 1]),
    selectedTablet: 0,
    selectedHole: Hole.A,
};

const reducer = (state: StateType = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case SELECT_NEXT_HOLE:
            return update(state, 'selectedHole',
                (hole) => hole !== Hole.D ?  hole + 1 : Hole.A,
            );
        case SELECT_PREV_HOLE:
            return update(state, 'selectedHole',
                (hole) => hole !== Hole.A ? hole - 1 : Hole.D,
            );
        case SELECT_NEXT_TABLET:
            return update(state, 'selectedTablet',
                (tablet) => tablet < state.threading.length - 1 ? tablet + 1 : 0,
            );
        case SELECT_PREV_TABLET:
            return update(state, 'selectedTablet',
                (tablet) => tablet > 0 ? tablet - 1 : state.threading.length - 1,
            );
        case SET_S_THREADING:
            return update(state, 'threading',
                (threading) => update(threading, state.selectedTablet, () => ThreadingType.S),
            );
        case SET_Z_THREADING:
            return update(state, 'threading',
                (threading) => update(threading, state.selectedTablet, () => ThreadingType.Z),
            );
        case SELECT_THREAD:
            return update(state, 'threads',
                (threads) => update(threads, state.selectedTablet,
                    (tablet) => updateTablet(tablet, state.selectedHole, () => action.number),
                ),
            );
        default:
            return state;
    }
};

export default reducer;
