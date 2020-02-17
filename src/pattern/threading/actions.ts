import {FULL_NAME} from './constants';

export const SELECT_NEXT_TABLET = `${FULL_NAME}/next-tablet` as 'next-tablet';
export const SELECT_PREV_TABLET = `${FULL_NAME}/prev-tablet` as 'prev-tablet';
export const SELECT_NEXT_HOLE = `${FULL_NAME}/next-hole` as 'next-hole';
export const SELECT_PREV_HOLE = `${FULL_NAME}/prev-hole` as 'prev-hole';

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

export const selectNextTablet = (): SelectNextTabletActionType => ({type: SELECT_NEXT_TABLET});
export const selectPreviousTablet = (): SelectPrevTabletActionType => ({type: SELECT_PREV_TABLET});
export const selectNextHole = (): SelectNextHoleActionType => ({type: SELECT_NEXT_HOLE});
export const selectPreviousHole = (): SelectPrevHoleActionType => ({type: SELECT_PREV_HOLE});

export type ActionType =
    SelectNextHoleActionType
    | SelectNextTabletActionType
    | SelectPrevHoleActionType
    | SelectPrevTabletActionType;
