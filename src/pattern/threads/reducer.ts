import {Color} from '~types';
import {append, remove, update} from '~utils/array';
import palette from '~utils/palette';
import {combineContextReducers} from '~utils/redux';

import {ADD_THREAD, IMPORT_DESIGN, REMOVE_THREAD} from '../actions';
import {Context} from '../types';
import {ActionType, SET_COLOR, TOGGLE_PICKER} from './actions';

const initialColors  = [palette[40], palette[0], palette[23]];

const colors = (state = initialColors, action: ActionType, {selection}: Context): Array<Color> => {
    switch (action.type) {
        case SET_COLOR:
            return update(selection.thread, () => action.color)(state);
        case ADD_THREAD:
            return append(state, palette[0]);
        case REMOVE_THREAD:
            return remove(action.thread ?? selection.thread)(state);
        case IMPORT_DESIGN:
            return action.data.threads;
        default:
            return state;
    }
};

const pickerVisible = (state = false, action: ActionType): boolean => {
    switch (action.type) {
        case SET_COLOR:
            return false;
        case TOGGLE_PICKER:
            return action.visible;
        default:
            return state;
    }
};

// FIXME break state and model reducer

const reducer = combineContextReducers({colors, pickerVisible});
export type StateType = ReturnType<typeof reducer>;
export default reducer;
