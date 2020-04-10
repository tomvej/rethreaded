import {ActionType as ParentActiontype} from '../actions';
import {FULL_NAME} from './constants';

export const SWITCH_IMPORT_DIALOG = `${FULL_NAME}/import-dialog` as 'import-dialog';
export const SWITCH_EXPORT_DIALOG = `${FULL_NAME}/export-dialog` as 'export-dialog';

export interface SwitchImportDialogActionType {
    type: typeof SWITCH_IMPORT_DIALOG;
    visible: boolean;
}
export interface SwitchExportDialogActionType {
    type: typeof SWITCH_EXPORT_DIALOG;
    visible: boolean;
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

export type ActionType = ParentActiontype
    | SwitchImportDialogActionType
    | SwitchExportDialogActionType;
