import {FULL_NAME} from './constants';

export const SELECT_NEXT = `${FULL_NAME}/select-next` as 'select-next';
export const SELECT_PREVIOUS = `${FULL_NAME}/select-previous` as 'select-previous';
export const SELECT = `${FULL_NAME}/select` as 'select';

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
