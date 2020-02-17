import {Color} from '~types';
import {fromHex} from '~utils/color';

import {ActionTypes, SELECT, SELECT_NEXT, SELECT_PREVIOUS} from './actions';

export type ThreadsState = {
    colors: Array<Color>; // TODO should be ReadonlyArray, but that has problems with length
    selected: number;
};

const initialState = {
    colors: [fromHex('#000000'), fromHex('#ffffff'), fromHex('#0F52BA')],
    selected: 0,
};

const reducer = (state = initialState, action: ActionTypes): ThreadsState => {
    switch (action.type) {
        case SELECT_PREVIOUS:
            return Object.assign({
                ...state,
                selected: state.selected > 0 ? state.selected - 1 : state.colors.length - 1,
            });
        case SELECT_NEXT:
            return Object.assign({
                ...state,
                selected: state.selected < state.colors.length - 1 ? state.selected + 1 : 0,
            });
        case SELECT:
            return Object.assign({
                ...state,
                selected: action.number,
            });
        default:
            return state;
    }
};

export default reducer;
