import {FULL_NAME} from './constants';

export const SELECT_NEXT = `${FULL_NAME}/select-next`;
export const SELECT_PREVIOUS = `${FULL_NAME}/select-previous`;

export interface SelectNextActionType {
    type: typeof SELECT_NEXT;
}

export interface SelectPreviousActionType {
    type: typeof SELECT_PREVIOUS;
}

export const selectNext = (): SelectNextActionType => ({type: SELECT_NEXT});

export const selectPrevious = (): SelectPreviousActionType => ({type: SELECT_PREVIOUS});

export type ActionTypes = SelectNextActionType | SelectPreviousActionType;
