import {Hole, Tablet, ThreadingType} from '~types';
import {update} from '~utils/func';

import {ActionType, SELECT_NEXT_HOLE, SELECT_PREV_HOLE} from './actions';

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
        default:
            return state;
    }
};

export default reducer;
