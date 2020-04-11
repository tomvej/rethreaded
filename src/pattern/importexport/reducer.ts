import {eqString} from 'fp-ts/es6/Eq';
import {getEq as getRecordEq} from 'fp-ts/es6/Record';
import {combineReducers, Reducer} from 'redux';

import {IMPORT_DESIGN} from '../actions';
import {ActionType, SET_INFO, SWITCH_EXPORT_DIALOG, SWITCH_IMPORT_DIALOG} from './actions';
import {Info, InfoProperty} from './types';

const importDialogVisible = (state = false, action: ActionType): boolean => {
    switch (action.type) {
        case SWITCH_IMPORT_DIALOG:
            return action.visible;
        case IMPORT_DESIGN:
            return false;
        default:
            return state;
    }
};

const exportDialogVisible = (state = false, action: ActionType): boolean => {
    switch (action.type) {
        case SWITCH_EXPORT_DIALOG:
            return action.visible;
        default:
            return state;
    }
}

export const stateReducer = combineReducers({
    importDialogVisible,
    exportDialogVisible,
});

export type StateType = ReturnType<typeof stateReducer>;

const createInfoReducer = (property: InfoProperty) => (state = '', action: ActionType): string => {
    switch (action.type) {
        case SET_INFO:
            return action.values[property];
        case IMPORT_DESIGN:
            return action.data[property];
        default:
            return state;
    }
}

export const modelReducer = combineReducers({
    name: createInfoReducer('name'),
    description: createInfoReducer('description'),
    tags: createInfoReducer('tags'),
})
