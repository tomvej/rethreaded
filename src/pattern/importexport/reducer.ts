import {combineReducers} from 'redux';

import {IMPORT_DESIGN} from '../actions';
import {ActionType, SWITCH_EXPORT_DIALOG, SWITCH_IMPORT_DIALOG} from './actions';

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

const reducer = combineReducers({
    importDialogVisible,
    exportDialogVisible,
});

export type StateType = ReturnType<typeof reducer>;

export default reducer;
