import {snoc} from 'fp-ts/es6/Array';

import {Color} from '~types';
import * as array  from '~utils/array';
import palette from '~utils/palette';
import * as record from '~utils/record';
import {combineContextReducers} from '~utils/redux';

import {ADD_THREAD, CLEAR, IMPORT_DESIGN, REMOVE_THREAD} from '../actions';
import {Context, ThreadId} from '../types';
import {ActionType, SET_COLOR, TOGGLE_PICKER} from './actions';

const initialThreadIds = [0, 1];
const threads = (state: Array<ThreadId> = initialThreadIds, action: ActionType, {selection}: Context): Array<ThreadId> => {
    switch (action.type) {
        case ADD_THREAD:
            return snoc(state, state.length);
        case IMPORT_DESIGN:
            return array.seq(action.threadIds.length);
        case REMOVE_THREAD:
            return array.remove(action.thread ?? selection.thread)(state);
        case CLEAR:
            return initialThreadIds;
        default:
            return state;
    }
}

type ColorState = Record<ThreadId, Color>;
const initialColors: ColorState = {
    [initialThreadIds[0]]: palette[40][0],
    [initialThreadIds[1]]: palette[0][0],
};
const colors = (state = initialColors, action: ActionType, {selection, threads}: Context): ColorState => {
    switch(action.type) {
        case SET_COLOR:
            return record.update(selection.thread, () => action.color)(state);
        case ADD_THREAD:
            return record.update(threads.length, () => palette[0][0])(state);
        case REMOVE_THREAD:
            return record.remove(action.thread ?? selection.thread)(state);
        case IMPORT_DESIGN:
            return state; // FIXME
        case CLEAR:
            return initialColors;
        default:
            return state;
    }
}

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
