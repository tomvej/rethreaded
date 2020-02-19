import {Color} from '~types';
import {fromHex} from '~utils/color';

export type StateType =  Array<Color>; // TODO should be ReadonlyArray, but that has problems with length

const initial = [fromHex('#000000'), fromHex('#ffffff'), fromHex('#0F52BA')];

const reducer = (state = initial): StateType => state;

export default reducer;
