import {getOrElse} from 'fp-ts/es6/Option';
import {pipe} from 'fp-ts/es6/pipeable';
import {getLastSemigroup} from 'fp-ts/es6/Semigroup';

import * as array from '~func/array';
import * as record from '~func/record';
import {Color} from '~types';
import palette from '~utils/palette';
import {combineContextReducers} from '~utils/redux';

import {ADD_THREAD, CLEAR, IMPORT_DESIGN, REMOVE_THREAD} from '../actions';
import {initialThreadIds} from '../constants';
import {Context, ThreadId} from '../types';
import {ActionType, SET_COLOR, TOGGLE_PICKER} from './actions';

const threads = (state: Array<ThreadId> = initialThreadIds, action: ActionType, {selection}: Context): Array<ThreadId> => {
    switch (action.type) {
        case ADD_THREAD:
            return array.snoc(state, action.newId);
        case IMPORT_DESIGN:
            return action.threadIds;
        case REMOVE_THREAD:
            return pipe(
                state,
                array.deleteAt(action.thread ? state.indexOf(action.thread) : selection.thread),
                getOrElse(() => state),
            );
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
            return pipe(
                state,
                record.updateAt(threads[selection.thread], action.color),
                getOrElse(() => state),
            )
        case ADD_THREAD:
            return pipe(
                state,
                record.updateAt(action.newId, palette[0][0]),
                getOrElse(() => state),
            )
        case REMOVE_THREAD:
            return pipe(
                state,
                record.deleteAt(action.thread ?? threads[selection.thread]),
            );
        case IMPORT_DESIGN:
            return pipe(
                action.data.threads,
                array.addIndices((i) => action.threadIds[i]),
                record.fromFoldable(getLastSemigroup(), array.array)
            );
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
