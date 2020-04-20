import {ActionType as ParentActionType} from '../actions';
import {ThreadId} from '../types';
import {FULL_NAME} from './constants';

export const NEXT_THREAD = `${FULL_NAME}/next-thread` as 'next-thread';
export const PREV_THREAD = `${FULL_NAME}/prev-thread` as 'prev-thread';
export const NEXT_TABLET = `${FULL_NAME}/next-tablet` as 'next-tablet';
export const PREV_TABLET = `${FULL_NAME}/prev-tablet` as 'prev-tablet';
export const NEXT_HOLE = `${FULL_NAME}/next-hole` as 'next-hole';
export const PREV_HOLE = `${FULL_NAME}/prev-hole` as 'prev-hole';
export const SELECT_THREAD = `${FULL_NAME}/thread` as 'select-thread';
export const NEXT_ROW = `${FULL_NAME}/next-row` as 'next-row';
export const PREV_ROW = `${FULL_NAME}/prev-row` as 'prev-row';

export type NextThreadActionType = {type: typeof NEXT_THREAD};
export type PrevThreadActionType = {type: typeof PREV_THREAD};
export type NextTabletActionType = {type: typeof NEXT_TABLET};
export type PrevTabletActionType = {type: typeof PREV_TABLET};
export type NextHoleActionType = {type: typeof NEXT_HOLE};
export type PrevHoleActionType = {type: typeof PREV_HOLE};
export type SelectThreadActionType = {
    type: typeof SELECT_THREAD;
    thread: ThreadId;
};
export type NextRowActionType = {type: typeof NEXT_ROW};
export type PrevRowActionType = {type: typeof PREV_ROW};

export const selectNextThread = (): NextThreadActionType => ({type: NEXT_THREAD});
export const selectPrevThread = (): PrevThreadActionType => ({type: PREV_THREAD});
export const selectNextTablet = (): NextTabletActionType => ({type: NEXT_TABLET});
export const selectPrevTablet = (): PrevTabletActionType => ({type: PREV_TABLET});
export const selectNextHole = (): NextHoleActionType => ({type: NEXT_HOLE});
export const selectPrevHole = (): PrevHoleActionType => ({type: PREV_HOLE});
export const selectThread = (thread: ThreadId): SelectThreadActionType => ({
    type: SELECT_THREAD,
    thread,
});
export const selectNextRow = (): NextRowActionType => ({type: NEXT_ROW});
export const selectPrevRow = (): PrevRowActionType => ({type: PREV_ROW});

export type ActionType = NextThreadActionType
    | PrevThreadActionType
    | NextTabletActionType
    | PrevTabletActionType
    | NextHoleActionType
    | PrevHoleActionType
    | SelectThreadActionType
    | ParentActionType
    | NextRowActionType
    | PrevRowActionType
