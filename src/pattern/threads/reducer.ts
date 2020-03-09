import {Color} from '~types';
import {update} from '~utils/func';
import palette from '~utils/palette';
import {combineContextReducers} from '~utils/redux';

import {ADD_THREAD, REMOVE_THREAD} from '../actions';
import {Context} from '../types';
import {ActionType, SET_COLOR, TOGGLE_PICKER} from './actions';

const initialColors  = [palette[40], palette[0], palette[23]];

const colors = (state = initialColors, action: ActionType, {selection}: Context): Array<Color> => {
    switch (action.type) {
        case SET_COLOR:
            return update(state, selection.thread, () => action.color);
        case ADD_THREAD:
            return state.concat([palette[0]]); // TODO unify
        case REMOVE_THREAD:
            return state.filter((_, index) => index !== selection.thread); // TODO unify
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

const reducer = combineContextReducers({colors, pickerVisible});
export type StateType = ReturnType<typeof reducer>;
export default reducer;
