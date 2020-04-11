import {ActionType as ParentActionType} from '../actions';
import {FULL_NAME} from './constants';
import {Info} from './types';

export const SWITCH_IMPORT_DIALOG = `${FULL_NAME}/import-dialog` as 'import-dialog';
export const SWITCH_EXPORT_DIALOG = `${FULL_NAME}/export-dialog` as 'export-dialog';
export const SET_INFO = `${FULL_NAME}/set-info` as 'set-info';

export interface SwitchImportDialogActionType {
    type: typeof SWITCH_IMPORT_DIALOG;
    visible: boolean;
}
export interface SwitchExportDialogActionType {
    type: typeof SWITCH_EXPORT_DIALOG;
    visible: boolean;
}

export interface SetInfoActionType {
    type: typeof SET_INFO;
    values: Info;
}

export const showImportDialog = (): SwitchImportDialogActionType => ({
    type: SWITCH_IMPORT_DIALOG,
    visible: true,
});
export const hideImportDialog = (): SwitchImportDialogActionType => ({
    type: SWITCH_IMPORT_DIALOG,
    visible: false,
});

export const showExportDialog = (): SwitchExportDialogActionType => ({
    type: SWITCH_EXPORT_DIALOG,
    visible: true,
});
export const hideExportDialog = (): SwitchExportDialogActionType => ({
    type: SWITCH_EXPORT_DIALOG,
    visible: false,
});

export const setInfo = (values: Info): SetInfoActionType => ({type: SET_INFO, values});

export type ActionType = ParentActionType
    | SwitchImportDialogActionType
    | SwitchExportDialogActionType
    | SetInfoActionType
