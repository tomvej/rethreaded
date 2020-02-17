import {FULL_NAME} from './constants';

export const SELECT_NEXT_TABLET = `${FULL_NAME}/next-tablet` as 'next-tablet';
export const SELECT_PREV_TABLET = `${FULL_NAME}/prev-tablet` as 'prev-tablet';
export const SELECT_NEXT_HOLE = `${FULL_NAME}/next-hole` as 'next-hole';
export const SELECT_PREV_HOLE = `${FULL_NAME}/prev-hole` as 'prev-hole';
export const SET_S_THREADING = `${FULL_NAME}/set-s-threading` as 'set-s-threading';
export const SET_Z_THREADING = `${FULL_NAME}/set-z-threading` as 'set-z-threading';

export interface SelectNextTabletActionType {
    type: typeof SELECT_NEXT_TABLET;
}
export interface SelectPrevTabletActionType {
    type: typeof SELECT_PREV_TABLET;
}
export interface SelectNextHoleActionType {
    type: typeof SELECT_NEXT_HOLE;
}
export interface SelectPrevHoleActionType {
    type: typeof SELECT_PREV_HOLE;
}
export interface SetSThreadingActionType {
    type: typeof SET_S_THREADING;
}
export interface SetZThreadingActionType {
    type: typeof SET_Z_THREADING;
}

export const selectNextTablet = (): SelectNextTabletActionType => ({type: SELECT_NEXT_TABLET});
export const selectPreviousTablet = (): SelectPrevTabletActionType => ({type: SELECT_PREV_TABLET});
export const selectNextHole = (): SelectNextHoleActionType => ({type: SELECT_NEXT_HOLE});
export const selectPreviousHole = (): SelectPrevHoleActionType => ({type: SELECT_PREV_HOLE});
export const setSThreading = (): SetSThreadingActionType => ({type: SET_S_THREADING});
export const setZThreading = (): SetZThreadingActionType => ({type: SET_Z_THREADING});

export type ActionType =
    SelectNextHoleActionType
    | SelectNextTabletActionType
    | SelectPrevHoleActionType
    | SetSThreadingActionType
    | SetZThreadingActionType
    | SelectPrevTabletActionType;
