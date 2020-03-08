import {Hole} from '~types';

import {NAME} from './constants';

export const SELECT_AND_APPLY_THREAD = `${NAME}/select-apply-thread` as 'select-apply-thread';
export const ADD_THREAD = `${NAME}/add-thread` as 'add-thread';
export const REMOVE_THREAD = `${NAME}/remove-thread` as 'remove-thread';
export const ADD_TABLET_AFTER = `${NAME}/add-tablet-after` as 'add-tablet-after';
export const ADD_TABLET_BEFORE = `${NAME}/add-tablet-before` as 'add-tablet-before';
export const REMOVE_TABLET = `${NAME}/remove-tablet` as 'remove-tablet';

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
}

export interface AddTabletAfterActionType {
    type: typeof ADD_TABLET_AFTER;
}

export interface AddTabletBeforeActionType {
    type: typeof ADD_TABLET_BEFORE;
}

export interface RemoveTabletActionType {
    type: typeof REMOVE_TABLET;
}

export const selectAndApplyThread = (tablet: number, hole: Hole): SelectAndApplyThreadActionType => ({
    type: SELECT_AND_APPLY_THREAD,
    tablet,
    hole,
});

export const addThread = (): AddThreadActionType => ({type: ADD_THREAD});

export const removeThread = (): RemoveThreadActionType => ({type: REMOVE_THREAD});

export const addTabletAfter = (): AddTabletAfterActionType => ({type: ADD_TABLET_AFTER});

export const addTabletBefore = (): AddTabletBeforeActionType => ({type: ADD_TABLET_BEFORE});

export const removeTablet = (): RemoveTabletActionType => ({type: REMOVE_TABLET});

export type ActionType =
    SelectAndApplyThreadActionType
    | AddThreadActionType
    | RemoveThreadActionType
    | AddTabletAfterActionType
    | AddTabletBeforeActionType
    | RemoveTabletActionType
