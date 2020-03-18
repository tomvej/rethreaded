import {Direction} from '~types';
import {seq} from '~utils/array';

import {INIT_TABLET_NUMBER} from '../constants';

const INIT_ROWS = 4;

export type StateType = Array<Array<Direction>>;
const initState = seq(INIT_ROWS).map(() => Array(INIT_TABLET_NUMBER).fill(Direction.Forward));
export default (state: StateType = initState): StateType => state;
