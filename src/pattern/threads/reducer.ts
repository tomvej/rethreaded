import {array as FoldableArray, mapWithIndex, snoc} from 'fp-ts/es6/Array';
import {pipe} from 'fp-ts/es6/pipeable';
import {fromFoldable} from 'fp-ts/es6/Record';
import {getLastSemigroup} from 'fp-ts/es6/Semigroup';

import {Color} from '~types';
import * as array from '~utils/array';
import palette from '~utils/palette';
import * as record from '~utils/record';
import {combineContextReducers} from '~utils/redux';

import {ADD_THREAD, CLEAR, IMPORT_DESIGN, REMOVE_THREAD} from '../actions';
import {initialThreadIds} from '../constants';
import {Context, ThreadId} from '../types';
import {ActionType, SET_COLOR, TOGGLE_PICKER} from './actions';

const threads = (state: Array<ThreadId> = initialThreadIds, action: ActionType, {selection}: Context): Array<ThreadId> => {
    switch (action.type) {
        case ADD_THREAD:
            return snoc(state, action.newId);
        case IMPORT_DESIGN:
            return action.threadIds;
        case REMOVE_THREAD:
            return array.remove(action.thread ? state.indexOf(action.thread) : selection.thread)(state);
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
            return record.update(threads[selection.thread], () => action.color)(state);
        case ADD_THREAD:
            return record.update(action.newId, () => palette[0][0])(state);
        case REMOVE_THREAD:
            return record.remove(action.thread ?? threads[selection.thread])(state);
        case IMPORT_DESIGN: {
            const preArray: Array<[ThreadId, Color]> = pipe(
                action.data.threads,
                mapWithIndex((index, color) => [action.threadIds[index], color]),
            );
            return fromFoldable(getLastSemigroup<Color>(), FoldableArray)(preArray);
        }
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
