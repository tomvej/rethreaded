import {FULL_NAME} from './constants';

export const SELECT_NEXT = 'select-next';
export const SELECT_PREVIOUS = 'select-previous';
export const SELECT = 'select';

export interface SelectNextActionType {
    type: typeof SELECT_NEXT;
}

export interface SelectPreviousActionType {
    type: typeof SELECT_PREVIOUS;
}

export interface SelectActionType {
    type: typeof SELECT;
    number: number;
}

export const selectNext = (): SelectNextActionType => ({type: SELECT_NEXT});

export const selectPrevious = (): SelectPreviousActionType => ({type: SELECT_PREVIOUS});

export const select = (number: number): SelectActionType => ({
    type: SELECT,
    number,
});

export type ActionTypes = SelectNextActionType | SelectPreviousActionType | SelectActionType;
