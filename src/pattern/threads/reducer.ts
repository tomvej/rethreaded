import {Color} from '~types';
import {update} from '~utils/func';
import palette from '~utils/palette';

import {ADD_THREAD} from '../actions';
import {SelectionState} from '../types';
import {ActionType, SET_COLOR, TOGGLE_PICKER} from './actions';

export type StateType = {
    colors: Array<Color>; // TODO should be ReadonlyArray, but that has problems with length
    pickerVisible: boolean;
}

const initial = {
    colors: [palette[40], palette[0], palette[23]],
    pickerVisible: false
};

const reducer = (state: StateType = initial, action: ActionType, selection: SelectionState): StateType => {
    switch (action.type) {
        case SET_COLOR:
            return {
                colors: update(state.colors, selection.thread, () => action.color),
                pickerVisible: false,
            };
        case TOGGLE_PICKER:
            return update(state, 'pickerVisible', () => action.visible);
        case ADD_THREAD:
            return update(state, 'colors', (colors) => colors.concat([palette[0]]));
        default:
            return state;
    }
};

export default reducer;
