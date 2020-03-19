import {Direction} from '~types';

import {ActionType as ParentActionType} from '../actions';
import {FULL_NAME} from './constants';

export const TOGGLE_DIRECTION = `${FULL_NAME}/toggle-direction` as 'toggle-direction';
export const SET_DIRECTION = `${FULL_NAME}/set-direction` as 'set-direction';

export interface ToggleDirectionActionType {
    type: typeof TOGGLE_DIRECTION;
}
export interface SetDirectionActionType {
    type: typeof SET_DIRECTION;
    direction: Direction;
}

export const toggleDirection = (): ToggleDirectionActionType => ({type: TOGGLE_DIRECTION});

export const setDirection = (direction: Direction): SetDirectionActionType => ({
    type: SET_DIRECTION,
    direction,
});

export type ActionType = ParentActionType
    | ToggleDirectionActionType
    | SetDirectionActionType
