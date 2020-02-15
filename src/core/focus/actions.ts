import {NAME} from './constants';

export const FOCUS_GAINED = `${NAME}/focus-gained`;
export const FOCUS_LOST = `${NAME}/focus-lost`;

export interface FocusGainedActionType {
    type: typeof FOCUS_GAINED;
    container: string;
}

export const focusGained = (container: string): FocusGainedActionType => ({
    type: FOCUS_GAINED,
    container,
});

export interface FocusLostActionType {
    type: typeof FOCUS_LOST;
    container: string;
}

export const focusLost = (container: string): FocusLostActionType => ({
    type: FOCUS_LOST,
    container,
});

export type ActionType = FocusGainedActionType | FocusLostActionType;
