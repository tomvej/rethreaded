import * as uuid from 'uuid';

import {Hole} from '~types';

import {NAME} from './constants';
import {IOShape, RowId, TabletId, ThreadId} from './types';
import {createIds} from './utils';

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
export const CLEAR = `${NAME}/clear` as 'clear';

export interface SelectAndApplyThreadActionType {
    type: typeof SELECT_AND_APPLY_THREAD;
    tablet: TabletId;
    hole: Hole;
}

export interface AddThreadActionType {
    type: typeof ADD_THREAD;
    newId: ThreadId;
}

export interface RemoveThreadActionType {
    type: typeof REMOVE_THREAD;
    thread: ThreadId | undefined;
}

export interface AddTabletAfterActionType {
    type: typeof ADD_TABLET_AFTER;
    newId: TabletId;
    tablet: TabletId | undefined;
}

export interface AddTabletBeforeActionType {
    type: typeof ADD_TABLET_BEFORE;
    newId: TabletId;
    tablet: TabletId | undefined;
}

export interface RemoveTabletActionType {
    type: typeof REMOVE_TABLET;
    tablet: TabletId | undefined;
}

export interface SelectAndToggleDirectionActionType {
    type: typeof SELECT_AND_TOGGLE_DIRECTION;
    tablet: TabletId;
    row: RowId;
}

export interface AddRowAfterActionType {
    type: typeof ADD_ROW_AFTER;
    newId: RowId;
    row?: RowId;
}

export interface AddRowBeforeActionType {
    type: typeof ADD_ROW_BEFORE;
    newId: RowId;
    row?: RowId;
}

export interface RemoveRowActionType {
    type: typeof REMOVE_ROW;
    row?: RowId;
}

export interface ImportDesignActionType {
    type: typeof IMPORT_DESIGN;
    data: IOShape;
    threadIds: Array<ThreadId>;
    tabletIds: Array<TabletId>;
    rowIds: Array<RowId>;
}
export interface ClearActionType {
    type: typeof CLEAR;
}

export const selectAndApplyThread = (tablet: TabletId, hole: Hole): SelectAndApplyThreadActionType => ({
    type: SELECT_AND_APPLY_THREAD,
    tablet,
    hole,
});

export const addThread = (): AddThreadActionType => ({
    type: ADD_THREAD,
    newId: uuid.v4() as ThreadId,
});
export const removeThread = (thread?: ThreadId): RemoveThreadActionType => ({type: REMOVE_THREAD, thread});

export const addTabletAfter = (tablet?: TabletId): AddTabletAfterActionType => ({
    type: ADD_TABLET_AFTER,
    tablet,
    newId: uuid.v4() as TabletId,
});
export const addTabletBefore = (tablet?: TabletId): AddTabletBeforeActionType => ({
    type: ADD_TABLET_BEFORE,
    tablet,
    newId: uuid.v4() as TabletId,
});
export const removeTablet = (tablet?: TabletId): RemoveTabletActionType => ({type: REMOVE_TABLET, tablet});

export const selectAndToggleDirection = (tablet: TabletId, row: RowId): SelectAndToggleDirectionActionType => ({
    type: SELECT_AND_TOGGLE_DIRECTION,
    tablet,
    row,
});

export const addRowAfter = (row?: RowId): AddRowAfterActionType => ({
    type: ADD_ROW_AFTER,
    row,
    newId: uuid.v4() as RowId,
});
export const addRowBefore = (row?: RowId): AddRowBeforeActionType => ({
    type: ADD_ROW_BEFORE,
    row,
    newId: uuid.v4() as RowId,
});
export const removeRow = (row?: RowId): RemoveRowActionType => ({type: REMOVE_ROW, row});

export const importDesign = (data: IOShape): ImportDesignActionType => ({
    type: IMPORT_DESIGN,
    threadIds: createIds(data.threads.length),
    tabletIds: createIds(data.threading.threads.length),
    rowIds: createIds(data.weaving.length),
    data,
});

export const clear = (): ClearActionType => ({type: CLEAR});

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
    | ClearActionType
