import {snoc} from 'fp-ts/es6/Array';

import {Color} from '~types';
import {remove, seq, update} from '~utils/array';
import palette from '~utils/palette';
import {combineContextReducers} from '~utils/redux';

import {ADD_THREAD, CLEAR, IMPORT_DESIGN, REMOVE_THREAD} from '../actions';
import {Context} from '../types';
import {ActionType, SET_COLOR, TOGGLE_PICKER} from './actions';

const initialThreadIds = [0, 1];
const threads = (state = initialThreadIds, action: ActionType, {selection}: Context): Array<number> => {
    switch (action.type) {
        case ADD_THREAD:
            return snoc(state, state.length);
        case IMPORT_DESIGN:
            return seq(action.threadIds.length);
        case REMOVE_THREAD:
            return remove(action.thread ?? selection.thread)(state); // FIXME
        case CLEAR:
            return initialThreadIds;
        default:
            return state;
    }
}

const initialColors  = [palette[40][0], palette[0][0]];
export const colors = (state = initialColors, action: ActionType, {selection}: Context): Array<Color> => {
    switch (action.type) {
        case SET_COLOR:
            return update(selection.thread, () => action.color)(state);
        case ADD_THREAD:
            return snoc(state, palette[0][0]);
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

export const modelReducer = combineContextReducers({threads, colors});
export type ModelType = ReturnType<typeof modelReducer>;

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
