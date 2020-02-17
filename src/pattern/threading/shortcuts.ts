import {MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP} from '~shortcuts';

import {selectNextHole, selectNextTablet, selectPreviousHole, selectPreviousTablet} from './actions';

export default {
    [MOVE_LEFT]: selectPreviousTablet,
    [MOVE_RIGHT]: selectNextTablet,
    [MOVE_UP]: selectNextHole,
    [MOVE_DOWN]: selectPreviousHole,
}
