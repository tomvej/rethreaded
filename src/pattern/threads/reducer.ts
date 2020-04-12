import {Color} from '~types';
import {append, remove, update} from '~utils/array';
import palette from '~utils/palette';

import {ADD_THREAD, CLEAR, IMPORT_DESIGN, REMOVE_THREAD} from '../actions';
import {Context} from '../types';
import {ActionType, SET_COLOR, TOGGLE_PICKER} from './actions';

const initialColors  = [palette[40][0], palette[0][0]];
export const modelReducer = (state = initialColors, action: ActionType, {selection}: Context): Array<Color> => {
    switch (action.type) {
        case SET_COLOR:
            return update(selection.thread, () => action.color)(state);
        case ADD_THREAD:
            return append(state, palette[0][0]);
        case REMOVE_THREAD:
            return remove(action.thread ?? selection.thread)(state);
        case IMPORT_DESIGN:
            return action.data.threads;
        case CLEAR:
            return initialColors;
        default:
            return state;
    }
};

export const stateReducer = (state = false, action: ActionType): boolean => {
    switch (action.type) {
        case SET_COLOR:
            return false;
        case TOGGLE_PICKER:
            return action.visible;
        default:
            return state;
    }
};
