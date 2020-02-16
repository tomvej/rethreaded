import {combineReducers} from 'redux';

import {Color} from '~types';
import {fromHex} from '~utils/color';

type ColorsState = Array<Color>; // TODO should be ReadonlyArray, but that has problems with length

const initialColors = [fromHex('#000000'), fromHex('#ffffff'), fromHex('#0F52BA')];

const colors = (state = initialColors): ColorsState => state;

const selected = (state = 0): number => state;

const reducer = combineReducers({
    colors,
    selected,
});

export type ThreadsState = ReturnType<typeof reducer>;

export default reducer;
