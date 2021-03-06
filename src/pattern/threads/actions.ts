import {Color} from '~types';

import {ActionType as ParentActionType} from '../actions';
import {FULL_NAME} from './constants';

export const SET_COLOR = `${FULL_NAME}/set-color` as 'set-color';
export const TOGGLE_PICKER = `${FULL_NAME}/toggle-picker` as 'toggle-picker';

export interface SetColorActionType {
    type: typeof SET_COLOR;
    color: Color;
}

export interface TogglePickerActionType {
    type: typeof TOGGLE_PICKER;
    visible: boolean;
}

export const setColor = (color: Color): SetColorActionType => ({
    type: SET_COLOR,
    color,
});

export const showPicker = (): TogglePickerActionType => ({
    type: TOGGLE_PICKER,
    visible: true,
});

export const hidePicker = (): TogglePickerActionType => ({
    type: TOGGLE_PICKER,
    visible: false,
});

export type ActionType =
    SetColorActionType
    | TogglePickerActionType
    | ParentActionType
