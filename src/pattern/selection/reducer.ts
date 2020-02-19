import {Hole} from '~types';
import {update} from '~utils/func';

import {SELECT_AND_APPLY_THREAD} from '../actions';
import {SelectionState, Setup} from '../types';
import {
    ActionType,
    NEXT_HOLE,
    NEXT_TABLET,
    NEXT_THREAD,
    PREV_HOLE,
    PREV_TABLET,
    PREV_THREAD,
    SELECT_THREAD,
} from './actions';

const initial = {
    thread: 0,
    tablet: 0,
    hole: Hole.A,
};

const increment = (max: number) => (value: number): number => value < max ? value + 1 : 0;
const decrement = (max: number) => (value: number): number => value > 0 ? value - 1 : max;

const reducer = (state: SelectionState = initial, action: ActionType, setup: Setup): SelectionState => {
    switch (action.type) {
        case NEXT_HOLE:
            return update(state, 'hole', (hole) => hole !== Hole.D ? hole + 1 : Hole.A);
        case PREV_HOLE:
            return update(state, 'hole', (hole) => hole !== Hole.A ? hole - 1 : Hole.D);
        case NEXT_TABLET:
            return update(state, 'tablet', increment(setup.tablets - 1));
        case PREV_TABLET:
            return update(state, 'tablet', decrement(setup.tablets - 1));
        case NEXT_THREAD:
            return update(state, 'thread', increment(setup.threads - 1));
        case PREV_THREAD:
            return update(state, 'thread', decrement(setup.threads - 1));
        case SELECT_THREAD:
            return update(state, 'thread', () => action.thread);
        case SELECT_AND_APPLY_THREAD:
            return ({
                ...state,
                tablet: action.tablet,
                hole: action.hole,
            });
        default:
            return state;
    }
};

export default reducer;
