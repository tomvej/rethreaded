import {Hole} from '~types';

import {NAME} from './constants';
import {IOShape} from './types';

export const SELECT_AND_APPLY_THREAD = `${NAME}/select-apply-thread` as 'select-apply-thread';
export const ADD_THREAD = `${NAME}/add-thread` as 'add-thread';
export const REMOVE_THREAD = `${NAME}/remove-thread` as 'remove-thread';
export const ADD_TABLET_AFTER = `${NAME}/add-tablet-after` as 'add-tablet-after';
export const ADD_TABLET_BEFORE = `${NAME}/add-tablet-before` as 'add-tablet-before';
export const REMOVE_TABLET = `${NAME}/remove-tablet` as 'remove-tablet';
export const SELECT_AND_TOGGLE_DIRECTION = `${NAME}/select-toggle-direction` as 'select-toggle-direction';
export const ADD_ROW_AFTER = `${NAME}/add-row-after` as 'add-row-after';
export const ADD_ROW_BEFORE = `${NAME}/add-row-before` as 'add-row-before';
export const REMOVE_ROW = `${NAME}/remove-row` as 'remove-row';
export const IMPORT_DESIGN = `${NAME}/import-design` as 'import-design';

export interface SelectAndApplyThreadActionType {
    type: typeof SELECT_AND_APPLY_THREAD;
    tablet: number;
    hole: Hole;
}

export interface AddThreadActionType {
    type: typeof ADD_THREAD;
}

export interface RemoveThreadActionType {
    type: typeof REMOVE_THREAD;
    thread: number | undefined;
}

export interface AddTabletAfterActionType {
    type: typeof ADD_TABLET_AFTER;
    tablet: number | undefined;
}

export interface AddTabletBeforeActionType {
    type: typeof ADD_TABLET_BEFORE;
    tablet: number | undefined;
}

export interface RemoveTabletActionType {
    type: typeof REMOVE_TABLET;
    tablet: number | undefined;
}

export interface SelectAndToggleDirectionActionType {
    type: typeof SELECT_AND_TOGGLE_DIRECTION;
    tablet: number;
    row: number;
}

export interface AddRowAfterActionType {
    type: typeof ADD_ROW_AFTER;
    row?: number;
}

export interface AddRowBeforeActionType {
    type: typeof ADD_ROW_BEFORE;
    row?: number;
}

export interface RemoveRowActionType {
    type: typeof REMOVE_ROW;
    row?: number;
}

export interface ImportDesignActionType {
    type: typeof IMPORT_DESIGN;
    data: IOShape;
}

export const selectAndApplyThread = (tablet: number, hole: Hole): SelectAndApplyThreadActionType => ({
    type: SELECT_AND_APPLY_THREAD,
    tablet,
    hole,
});

export const addThread = (): AddThreadActionType => ({type: ADD_THREAD});
export const removeThread = (thread?: number): RemoveThreadActionType => ({type: REMOVE_THREAD, thread});

export const addTabletAfter = (tablet?: number): AddTabletAfterActionType => ({type: ADD_TABLET_AFTER, tablet});
export const addTabletBefore = (tablet?: number): AddTabletBeforeActionType => ({type: ADD_TABLET_BEFORE, tablet});
export const removeTablet = (tablet?: number): RemoveTabletActionType => ({type: REMOVE_TABLET, tablet});

export const selectAndToggleDirection = (tablet: number, row: number): SelectAndToggleDirectionActionType => ({
    type: SELECT_AND_TOGGLE_DIRECTION,
    tablet,
    row,
});

export const addRowAfter = (row?: number): AddRowAfterActionType => ({type: ADD_ROW_AFTER, row});
export const addRowBefore = (row?: number): AddRowBeforeActionType => ({type: ADD_ROW_BEFORE, row});
export const removeRow = (row?: number): RemoveRowActionType => ({type: REMOVE_ROW, row});

export const importDesign = (data: IOShape): ImportDesignActionType => ({type: IMPORT_DESIGN, data});

export type ActionType =
    SelectAndApplyThreadActionType
    | AddThreadActionType
    | RemoveThreadActionType
    | AddTabletAfterActionType
    | AddTabletBeforeActionType
    | RemoveTabletActionType
    | SelectAndToggleDirectionActionType
    | AddRowAfterActionType
    | AddRowBeforeActionType
    | RemoveRowActionType
    | ImportDesignActionType
