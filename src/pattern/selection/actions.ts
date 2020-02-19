import {FULL_NAME} from './constants';

export const NEXT_THREAD = `${FULL_NAME}/next-thread` as 'next-thread';
export const PREV_THREAD = `${FULL_NAME}/prev-thread` as 'prev-thread';
export const NEXT_TABLET = `${FULL_NAME}/next-tablet` as 'next-tablet';
export const PREV_TABLET = `${FULL_NAME}/prev-tablet` as 'prev-tablet';
export const NEXT_HOLE = `${FULL_NAME}/next-hole` as 'next-hole';
export const PREV_HOLE = `${FULL_NAME}/prev-hole` as 'prev-hole';
export const SELECT_THREAD = `${FULL_NAME}/thread` as 'select-thread';

export type NextThreadActionType = {type: typeof NEXT_THREAD};
export type PrevThreadActionType = {type: typeof PREV_THREAD};
export type NextTabletActionType = {type: typeof NEXT_TABLET};
export type PrevTabletActionType = {type: typeof PREV_TABLET};
export type NextHoleActionType = {type: typeof NEXT_HOLE};
export type PrevHoleActionType = {type: typeof PREV_HOLE};
export type SelectThreadActionType = {
    type: typeof SELECT_THREAD;
    thread: number;
};

export const nextThread = (): NextThreadActionType => ({type: NEXT_THREAD});
export const prevThread = (): PrevThreadActionType => ({type: PREV_THREAD});
export const nextTablet = (): NextTabletActionType => ({type: NEXT_TABLET});
export const prevTablet = (): PrevTabletActionType => ({type: PREV_TABLET});
export const nextHole = (): NextHoleActionType => ({type: NEXT_HOLE});
export const prevHole = (): PrevHoleActionType => ({type: PREV_HOLE});
export const selectThread = (thread: number): SelectThreadActionType => ({
    type: SELECT_THREAD,
    thread,
});

export type ActionType = NextThreadActionType
    | PrevThreadActionType
    | NextTabletActionType
    | PrevTabletActionType
    | NextHoleActionType
    | PrevHoleActionType
    | SelectThreadActionType