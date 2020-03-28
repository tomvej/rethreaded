import {FULL_NAME} from './constants';

export const UNDO = `${FULL_NAME}/undo` as 'undo';
export const REDO = `${FULL_NAME}/redo` as 'redo';

export interface UndoActionType {
    type: typeof UNDO;
}
export interface RedoActionType {
    type: typeof REDO;
}

export const undo = (): UndoActionType => ({type: UNDO});
export const redo = (): RedoActionType => ({type: REDO});

export type ActionType = UndoActionType | RedoActionType;
