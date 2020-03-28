import {UndoState} from './createReducer';

export const getCurrent = <S>(state: UndoState<S>): S | undefined => state.current;
export const canUndo = <S>(state: UndoState<S>): boolean => state.undo.length > 0;
export const canRedo = <S>(state: UndoState<S>): boolean => state.redo.length > 0;
