import {ActionType, FOCUS_LOST, FOCUS_GAINED} from './actions';

export type StateType = string | null;

const reducer = (state: StateType = null, action: ActionType): StateType => {
    switch (action.type) {
        case FOCUS_LOST:
            if (action.container === state) {
                return null;
            } else {
                return state;
            }
        case FOCUS_GAINED:
            return action.container;
        default:
            return state;
    }
};

export default reducer;
