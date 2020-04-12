import {CLEAR} from '../actions';
import {ActionType, SET_PATTERN_REPEAT} from './actions';

const reducer = (state = 1, action: ActionType): number => {
    switch (action.type) {
        case SET_PATTERN_REPEAT:
            return action.repeat;
        case CLEAR:
            return 1;
        default:
            return state;
    }
}

export type StateType = ReturnType<typeof reducer>;
export default reducer;
