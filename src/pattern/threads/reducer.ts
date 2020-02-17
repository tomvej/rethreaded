import {Color} from '~types';
import {fromHex} from '~utils/color';
import {updateObject} from '~utils/func';

import {ActionTypes, SELECT, SELECT_NEXT, SELECT_PREVIOUS} from './actions';

export type StateType = {
    colors: Array<Color>; // TODO should be ReadonlyArray, but that has problems with length
    selected: number;
};

const initialState = {
    colors: [fromHex('#000000'), fromHex('#ffffff'), fromHex('#0F52BA')],
    selected: 0,
};

const reducer = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case SELECT_PREVIOUS:
            return updateObject(state, 'selected',
                (selected) => selected > 0 ? selected - 1 : state.colors.length - 1,
            );
        case SELECT_NEXT:
            return updateObject(state, 'selected',
                (selected) => selected < state.colors.length - 1 ? selected + 1 : 0,
            );
        case SELECT:
            return updateObject(state, 'selected',
                () => action.number,
            );
        default:
            return state;
    }
};

export default reducer;
