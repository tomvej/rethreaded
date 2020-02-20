import {SelectAndApplyThreadActionType} from '../actions';
import {FULL_NAME} from './constants';

export const SET_S_THREADING = `${FULL_NAME}/set-s-threading` as 'set-s-threading';
export const SET_Z_THREADING = `${FULL_NAME}/set-z-threading` as 'set-z-threading';
export const APPLY_THREAD = `${FULL_NAME}/apply-thread` as 'apply-thread';
export const TOGGLE_THREADING = `${FULL_NAME}/toggle-threading` as 'toggle-threading';

export interface SetSThreadingActionType {
    type: typeof SET_S_THREADING;
}
export interface SetZThreadingActionType {
    type: typeof SET_Z_THREADING;
}
export interface ApplyThreadActionType {
    type: typeof APPLY_THREAD;
    thread: number | undefined;
}

export interface ToggleThreadingActionType {
    type: typeof TOGGLE_THREADING;
    tablet: number;
}

export const setSThreading = (): SetSThreadingActionType => ({type: SET_S_THREADING});
export const setZThreading = (): SetZThreadingActionType => ({type: SET_Z_THREADING});
export const applyThread = (thread?: number): ApplyThreadActionType => ({
    type: APPLY_THREAD,
    thread,
});
export const toggleThreading = (tablet: number): ToggleThreadingActionType => ({
    type: TOGGLE_THREADING,
    tablet,
});

export type ActionType =
    SetSThreadingActionType
    | SetZThreadingActionType
    | ApplyThreadActionType
    | SelectAndApplyThreadActionType
    | ToggleThreadingActionType
