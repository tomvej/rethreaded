import {combineReducers} from 'redux';

import {ActionType, SWITCH_IMPORT_DIALOG} from './actions';

const importDialogVisible = (state = false, action: ActionType): boolean => {
    switch (action.type) {
        case SWITCH_IMPORT_DIALOG:
            return action.visible;
        default:
            return state;
    }
};

const reducer = combineReducers({
    importDialogVisible,
});

export type StateType = ReturnType<typeof reducer>;

export default reducer;
