import {ActionType as ParentActionType} from '../actions';
import {FULL_NAME} from './constants';

export const SET_PATTERN_REPEAT = `${FULL_NAME}/set-pattern-repeat` as 'set-pattern-repeat';

export interface SetPatternRepeatActionType {
    type: typeof SET_PATTERN_REPEAT;
    repeat: number;
}

export const setRepeatPattern = (repeat: number): SetPatternRepeatActionType => ({type: SET_PATTERN_REPEAT, repeat});
export const setSinglePattern = (): SetPatternRepeatActionType => ({type: SET_PATTERN_REPEAT, repeat: 1});

export type ActionType = ParentActionType | SetPatternRepeatActionType;
