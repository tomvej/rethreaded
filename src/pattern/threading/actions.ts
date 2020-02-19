import {Hole} from '~types';

import {FULL_NAME} from './constants';

export const SET_S_THREADING = `${FULL_NAME}/set-s-threading` as 'set-s-threading';
export const SET_Z_THREADING = `${FULL_NAME}/set-z-threading` as 'set-z-threading';
export const APPLY_THREAD = `${FULL_NAME}/apply-thread` as 'apply-thread';
export const SELECT_AND_APPLY_THREAD = `${FULL_NAME}/select-apply` as 'select-apply-thread';

export interface SetSThreadingActionType {
    type: typeof SET_S_THREADING;
}
export interface SetZThreadingActionType {
    type: typeof SET_Z_THREADING;
}
export interface SelectAndApplyThreadActionType {
    type: typeof SELECT_AND_APPLY_THREAD;
    tablet: number;
    hole: Hole;
}
export interface ApplyThreadActionType {
    type: typeof APPLY_THREAD;
    thread: number | undefined;
}

export const setSThreading = (): SetSThreadingActionType => ({type: SET_S_THREADING});
export const setZThreading = (): SetZThreadingActionType => ({type: SET_Z_THREADING});
export const selectAndApplyThread = (tablet: number, hole: Hole): SelectAndApplyThreadActionType => ({
    type: SELECT_AND_APPLY_THREAD,
    tablet,
    hole,
});
export const applyThread = (thread?: number): ApplyThreadActionType => ({
    type: APPLY_THREAD,
    thread,
});

export type ActionType =
    SetSThreadingActionType
    | SetZThreadingActionType
    | ApplyThreadActionType;
