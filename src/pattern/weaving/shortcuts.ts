import {MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP} from '~shortcuts';

import {selectNextRow, selectNextTablet, selectPrevRow, selectPrevTablet} from '../selection';

export default {
    [MOVE_LEFT]: selectPrevTablet,
    [MOVE_RIGHT]: selectNextTablet,
    [MOVE_UP]: selectNextRow,
    [MOVE_DOWN]: selectPrevRow,
}
